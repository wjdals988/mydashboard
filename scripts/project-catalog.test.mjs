import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { filterProjects, platformsOf } from "../src/lib/project-catalog.mjs";
const projects = JSON.parse(
  readFileSync(new URL("../src/lib/projects.json", import.meta.url), "utf8"),
);
const defaults = {
  query: "",
  status: "all",
  platform: "all",
  downloadOnly: false,
  sort: "curated",
};
const run = (filters = {}) =>
  filterProjects(projects, { ...defaults, ...filters });

test("default catalog preserves all project facts and editorial order", () => {
  assert.deepEqual(run(), projects);
  assert.notEqual(run(), projects);
});
test("search matches Korean names and case-insensitive English technology", () => {
  assert.deepEqual(
    run({ query: "런모니" }).map((p) => p.slug),
    ["runmoni"],
  );
  assert.ok(
    run({ query: "  kOtLiN  " }).every((p) => p.tags.includes("Kotlin")),
  );
  assert.ok(run({ query: "  kOtLiN  " }).length > 0);
});
test("multi-word search requires every term", () => {
  assert.deepEqual(
    run({ query: "android room" }).map((p) => p.slug),
    ["runmoni"],
  );
});
test("Android includes unpublished APK projects", () => {
  const android = run({ platform: "android" });
  assert.equal(android.length, 7);
  for (const slug of ["runmoni", "streamer-alert-system"])
    assert.ok(android.some((p) => p.slug === slug));
  assert.ok(
    platformsOf(projects.find((p) => p.slug === "pricehere")).includes(
      "android",
    ),
  );
});
test("APK availability is independent of platform and development status", () => {
  const downloadable = run({ platform: "android", downloadOnly: true });
  assert.equal(downloadable.length, 5);
  assert.ok(downloadable.every((p) => p.apk));
  assert.ok(!downloadable.some((p) => p.slug === "runmoni"));
});
test("status and platform filters intersect", () => {
  assert.equal(run({ platform: "android", status: "building" }).length, 5);
  assert.equal(run({ platform: "web", status: "live" }).length, 2);
  assert.equal(run({ platform: "web", downloadOnly: true }).length, 0);
});
test("empty searches and reset are deterministic", () => {
  assert.equal(run({ query: "no-such-project-xyz" }).length, 0);
  assert.deepEqual(run({ query: "   " }), projects);
  assert.equal(run().length, 9);
});
test("recent sort is descending and never mutates source data", () => {
  const snapshot = JSON.stringify(projects);
  const sorted = run({ sort: "updated" });
  assert.equal(sorted[0].slug, "runmoni");
  assert.ok(
    sorted.every((p, i) => i === 0 || sorted[i - 1].updatedAt >= p.updatedAt),
  );
  assert.equal(JSON.stringify(projects), snapshot);
});
