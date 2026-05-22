import { parseArgs } from "node:util";
import { readFile, writeFile } from "node:fs/promises";

const { values } = parseArgs({
  options: {
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

const versionCode = Number(values.versionCode);

if (!Number.isInteger(versionCode) || versionCode < 1) {
  throw new Error("--versionCode must be a positive integer");
}

const updatedAt = values.updatedAt ?? formatDateInKorea();
const projectsPath = new URL("../src/lib/projects.json", import.meta.url);
const projects = JSON.parse(await readFile(projectsPath, "utf8"));
const project = projects.find((item) => item.slug === values.slug);

if (!project) {
  throw new Error(`Project slug not found: ${values.slug}`);
}

project.updatedAt = updatedAt;
project.apk = {
  url: values.url,
  fileName: values.fileName,
  version: values.version,
  versionCode,
  size: values.size,
  sha256: values.sha256.toLowerCase(),
  releaseUrl: values.releaseUrl,
  label: values.label,
};

await writeFile(projectsPath, `${JSON.stringify(projects, null, 2)}\n`);

console.log(`Updated ${values.slug} APK metadata to v${values.version}.`);

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
