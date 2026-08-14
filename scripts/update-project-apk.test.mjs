import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  compareVersions,
  main,
  updateDescriptionVersion,
  validateApkMetadata,
  validateVersionProgression,
} from "./update-project-apk.mjs";

const nextApk = {
  url: "https://github.com/wjdals988/giftcondoctor/releases/download/v0.1.13/giftcondoctor-0.1.13-14-release-signed.apk",
  fileName: "giftcondoctor-0.1.13-14-release-signed.apk",
  version: "0.1.13",
  versionCode: "14",
  size: "59,600,000 bytes",
  sha256: "a".repeat(64),
  releaseUrl: "https://github.com/wjdals988/giftcondoctor/releases/tag/v0.1.13",
  label: "signed release APK",
};

test("accepts internally consistent APK metadata", () => {
  assert.deepEqual(validateApkMetadata(nextApk), {
    ...nextApk,
    url: nextApk.url,
    releaseUrl: nextApk.releaseUrl,
    versionCode: 14,
  });
});

test("rejects a digest that is not SHA-256", () => {
  assert.throws(
    () => validateApkMetadata({ ...nextApk, sha256: "abc" }),
    /64 hexadecimal/,
  );
});

test("rejects a release URL and asset URL version mismatch", () => {
  assert.throws(
    () => validateApkMetadata({ ...nextApk, url: nextApk.url.replace("v0.1.13", "v0.1.12") }),
    /matching GitHub release APK asset/,
  );
});

test("rejects malformed byte labels", () => {
  assert.throws(
    () => validateApkMetadata({ ...nextApk, size: "59,60,000 bytes" }),
    /positive byte count/,
  );
});

test("normalizes a raw byte count used by older release workflows", () => {
  assert.equal(
    validateApkMetadata({ ...nextApk, size: "59600000" }).size,
    "59,600,000 bytes",
  );
});

test("requires both semantic version and versionCode to increase", () => {
  const previous = {
    ...validateApkMetadata({
      ...nextApk,
      url: nextApk.url.replaceAll("0.1.13", "0.1.12").replace("-14-", "-13-"),
      fileName: nextApk.fileName.replace("0.1.13-14", "0.1.12-13"),
      version: "0.1.12",
      versionCode: "13",
      releaseUrl: nextApk.releaseUrl.replace("0.1.13", "0.1.12"),
    }),
  };

  assert.doesNotThrow(() => validateVersionProgression(previous, validateApkMetadata(nextApk)));
  assert.throws(
    () => validateVersionProgression(previous, validateApkMetadata({ ...nextApk, versionCode: "13" })),
    /versionCode must increase/,
  );
});

test("allows an exact retry but rejects replacing an existing release", () => {
  const normalized = validateApkMetadata(nextApk);

  assert.equal(validateVersionProgression(normalized, normalized), false);
  assert.throws(
    () => validateVersionProgression(normalized, { ...normalized, sha256: "b".repeat(64) }),
    /version must increase/,
  );
});

test("compares numeric SemVer components", () => {
  assert.equal(compareVersions("0.1.13", "0.1.12"), 1);
  assert.equal(compareVersions("1.0.0", "1.0.0"), 0);
  assert.equal(compareVersions("1.2.9", "1.10.0"), -1);
});

test("reconciles the visible description when a pending source is released", () => {
  const description =
    "현재 다운로드 가능한 배포 APK는 0.1.12 (13)이고, 최신 검증 소스는 0.1.13 (14, ecea756)입니다. Firebase 기반 앱입니다.";

  assert.equal(
    updateDescriptionVersion(description, "0.1.13", 14),
    "현재 버전은 0.1.13 (14)이며, Firebase 기반 앱입니다.",
  );
});

test("updates a project file and reconciles its visible release version", async (context) => {
  const directory = await mkdtemp(join(tmpdir(), "dashboard-apk-test-"));
  const projectsPath = join(directory, "projects.json");
  const messages = [];
  const previousProject = {
    slug: "gifticon-doctor",
    description:
      "현재 다운로드 가능한 배포 APK는 0.1.12 (13)이고, 최신 검증 소스는 0.1.13 (14, ecea756)입니다. Firebase 기반 앱입니다.",
    updatedAt: "2026.08.14",
    apk: validateApkMetadata({
      ...nextApk,
      url: nextApk.url.replaceAll("0.1.13", "0.1.12").replace("-14-", "-13-"),
      fileName: nextApk.fileName.replace("0.1.13-14", "0.1.12-13"),
      version: "0.1.12",
      versionCode: "13",
      releaseUrl: nextApk.releaseUrl.replace("0.1.13", "0.1.12"),
    }),
  };

  context.after(() => rm(directory, { force: true, recursive: true }));
  await writeFile(projectsPath, `${JSON.stringify([previousProject])}\n`);
  await main(apkArguments(nextApk), {
    projectsPath,
    log: (message) => messages.push(message),
  });

  const [updatedProject] = JSON.parse(await readFile(projectsPath, "utf8"));
  assert.equal(updatedProject.apk.version, "0.1.13");
  assert.equal(updatedProject.apk.versionCode, 14);
  assert.equal(updatedProject.description, "현재 버전은 0.1.13 (14)이며, Firebase 기반 앱입니다.");
  assert.match(messages.at(-1), /Updated gifticon-doctor APK metadata/);
});

test("dry run validates without changing the project file", async (context) => {
  const directory = await mkdtemp(join(tmpdir(), "dashboard-apk-dry-run-"));
  const projectsPath = join(directory, "projects.json");
  const contents = JSON.stringify([
    {
      slug: "gifticon-doctor",
      description: "Firebase 기반 앱입니다.",
      updatedAt: "2026.08.14",
      apk: validateApkMetadata(nextApk),
    },
  ]);

  context.after(() => rm(directory, { force: true, recursive: true }));
  await writeFile(projectsPath, contents);
  await main(["--dryRun", ...apkArguments(nextApk)], {
    projectsPath,
    log: () => {},
  });

  assert.equal(await readFile(projectsPath, "utf8"), contents);
});

test("main rejects missing options and unknown project slugs", async (context) => {
  const directory = await mkdtemp(join(tmpdir(), "dashboard-apk-errors-"));
  const projectsPath = join(directory, "projects.json");

  context.after(() => rm(directory, { force: true, recursive: true }));
  await writeFile(projectsPath, "[]\n");
  await assert.rejects(() => main([], { projectsPath, log: () => {} }), /Missing required option/);
  await assert.rejects(
    () => main(apkArguments(nextApk), { projectsPath, log: () => {} }),
    /Project slug not found/,
  );
});

function apkArguments(apk) {
  return [
    "--slug",
    "gifticon-doctor",
    "--url",
    apk.url,
    "--fileName",
    apk.fileName,
    "--version",
    apk.version,
    "--versionCode",
    String(apk.versionCode),
    "--size",
    apk.size,
    "--sha256",
    apk.sha256,
    "--releaseUrl",
    apk.releaseUrl,
  ];
}
