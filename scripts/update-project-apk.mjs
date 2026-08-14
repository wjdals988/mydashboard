import { readFile, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import { pathToFileURL } from "node:url";

const VERSION_PATTERN = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const SHA256_PATTERN = /^[0-9a-f]{64}$/i;
const DATE_PATTERN = /^\d{4}\.\d{2}\.\d{2}$/;
const SIZE_PATTERN = /^(?:[1-9]\d*|[1-9]\d{0,2}(?:,\d{3})* bytes)$/;

export async function main(
  argv = process.argv.slice(2),
  {
    projectsPath = new URL("../src/lib/projects.json", import.meta.url),
    log = console.log,
  } = {},
) {
  const { values } = parseArgs({
    args: argv,
    options: {
      dryRun: { type: "boolean", default: false },
      fileName: { type: "string" },
      label: { type: "string", default: "signed release APK" },
      releaseUrl: { type: "string" },
      sha256: { type: "string" },
      size: { type: "string" },
      slug: { type: "string" },
      updatedAt: { type: "string" },
      url: { type: "string" },
      version: { type: "string" },
      versionCode: { type: "string" },
    },
    strict: true,
  });

  const required = [
    "fileName",
    "releaseUrl",
    "sha256",
    "size",
    "slug",
    "url",
    "version",
    "versionCode",
  ];
  const missing = required.filter((key) => !values[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required option(s): ${missing.join(", ")}`);
  }

  const updatedAt = values.updatedAt ?? formatDateInKorea();
  const projects = JSON.parse(await readFile(projectsPath, "utf8"));

  assertProjectCollection(projects);

  const project = projects.find((item) => item.slug === values.slug);

  if (!project) {
    throw new Error(`Project slug not found: ${values.slug}`);
  }

  const apk = validateApkMetadata({
    fileName: values.fileName,
    label: values.label,
    releaseUrl: values.releaseUrl,
    sha256: values.sha256,
    size: values.size,
    url: values.url,
    version: values.version,
    versionCode: values.versionCode,
  });

  const isNewRelease = validateVersionProgression(project.apk, apk);

  if (!DATE_PATTERN.test(updatedAt)) {
    throw new Error("--updatedAt must use YYYY.MM.DD");
  }

  project.updatedAt = updatedAt;
  if (isNewRelease) {
    project.description = updateDescriptionVersion(
      project.description,
      apk.version,
      apk.versionCode,
    );
  }
  project.apk = apk;

  if (values.dryRun) {
    log(JSON.stringify(project, null, 2));
    log(`Validated ${values.slug} APK metadata for v${apk.version} (dry run).`);
    return;
  }

  await writeFile(projectsPath, `${JSON.stringify(projects, null, 2)}\n`);
  log(`Updated ${values.slug} APK metadata to v${apk.version}.`);
}

export function validateApkMetadata(input) {
  const versionCode = Number(input.versionCode);
  const sha256 = input.sha256.toLowerCase();

  if (!VERSION_PATTERN.test(input.version)) {
    throw new Error("--version must use SemVer x.y.z without a prefix");
  }

  if (!Number.isSafeInteger(versionCode) || versionCode < 1) {
    throw new Error("--versionCode must be a positive safe integer");
  }

  if (!input.fileName.endsWith(".apk") || input.fileName.includes("/")) {
    throw new Error("--fileName must be a plain .apk file name");
  }

  if (!SHA256_PATTERN.test(sha256)) {
    throw new Error("--sha256 must be exactly 64 hexadecimal characters");
  }

  if (!SIZE_PATTERN.test(input.size)) {
    throw new Error("--size must be a positive byte count such as 59,568,911 bytes");
  }

  const sizeDigits = input.size.endsWith(" bytes")
    ? input.size.slice(0, -" bytes".length).replaceAll(",", "")
    : input.size;
  const canonicalSize = `${BigInt(sizeDigits).toLocaleString("en-US")} bytes`;

  const releaseUrl = parseHttpsUrl(input.releaseUrl, "--releaseUrl");
  const downloadUrl = parseHttpsUrl(input.url, "--url");
  const releaseMatch = releaseUrl.pathname.match(
    /^\/([^/]+)\/([^/]+)\/releases\/tag\/v([^/]+)$/,
  );

  if (releaseUrl.hostname !== "github.com" || !releaseMatch) {
    throw new Error("--releaseUrl must be a github.com release tag URL");
  }

  const [, owner, repository, releaseVersion] = releaseMatch;
  const expectedDownloadPath = `/${owner}/${repository}/releases/download/v${input.version}/${input.fileName}`;

  if (releaseVersion !== input.version) {
    throw new Error("--releaseUrl tag must match --version");
  }

  if (downloadUrl.hostname !== "github.com" || downloadUrl.pathname !== expectedDownloadPath) {
    throw new Error("--url must point to the matching GitHub release APK asset");
  }

  if (!input.label.trim()) {
    throw new Error("--label must not be empty");
  }

  return {
    url: downloadUrl.toString(),
    fileName: input.fileName,
    version: input.version,
    versionCode,
    size: canonicalSize,
    sha256,
    releaseUrl: releaseUrl.toString(),
    label: input.label.trim(),
  };
}

export function validateVersionProgression(previous, next) {
  if (!previous) return true;

  const versionComparison = compareVersions(next.version, previous.version);
  const exactRetry =
    versionComparison === 0 &&
    next.versionCode === previous.versionCode &&
    next.url === previous.url &&
    next.fileName === previous.fileName &&
    next.size === previous.size &&
    next.sha256 === previous.sha256.toLowerCase() &&
    next.releaseUrl === previous.releaseUrl;

  if (exactRetry) return false;

  if (versionComparison <= 0) {
    throw new Error(`APK version must increase: ${next.version} <= ${previous.version}`);
  }

  if (next.versionCode <= previous.versionCode) {
    throw new Error(
      `APK versionCode must increase: ${next.versionCode} <= ${previous.versionCode}`,
    );
  }

  return true;
}

export function compareVersions(left, right) {
  const leftParts = parseVersion(left);
  const rightParts = parseVersion(right);

  for (let index = 0; index < leftParts.length; index += 1) {
    if (leftParts[index] !== rightParts[index]) {
      return leftParts[index] > rightParts[index] ? 1 : -1;
    }
  }

  return 0;
}

export function updateDescriptionVersion(description, version, versionCode) {
  if (typeof description !== "string") return description;

  const developmentPrefix =
    /^현재 다운로드 가능한 배포 APK는 \d+\.\d+\.\d+ \(\d+\)이고, 최신 검증 소스는 \d+\.\d+\.\d+ \(\d+, [0-9a-f]{7,40}\)입니다\.\s*/i;
  const releasedPrefix = /^현재 버전은 \d+\.\d+\.\d+(?: \(\d+\))?이며,\s*/;
  const remainder = description.replace(developmentPrefix, "").replace(releasedPrefix, "");

  if (remainder === description) return description;

  return `현재 버전은 ${version} (${versionCode})이며, ${remainder}`;
}

function parseVersion(version) {
  const match = version.match(VERSION_PATTERN);

  if (!match) {
    throw new Error(`Invalid SemVer: ${version}`);
  }

  return match.slice(1).map(Number);
}

function parseHttpsUrl(value, optionName) {
  let url;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`${optionName} must be a valid URL`);
  }

  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) {
    throw new Error(`${optionName} must be a clean HTTPS URL`);
  }

  return url;
}

function assertProjectCollection(projects) {
  if (!Array.isArray(projects)) {
    throw new Error("projects.json must contain an array");
  }

  const slugs = projects.map((project) => project.slug);
  const duplicate = slugs.find((slug, index) => slugs.indexOf(slug) !== index);

  if (duplicate) {
    throw new Error(`Duplicate project slug: ${duplicate}`);
  }
}

function formatDateInKorea() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const date = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${date.year}.${date.month}.${date.day}`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
