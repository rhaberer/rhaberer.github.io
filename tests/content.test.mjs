import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { projects, categories } from "../lib/projects.ts";
test("all project URLs are unique and their media exists", () => {
  assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length);
  for (const project of projects) {
    assert.ok(categories.includes(project.category));
    for (const path of [
      project.cover,
      project.video,
      ...project.images.map((i) => i.src),
    ].filter(Boolean))
      assert.ok(
        existsSync(`public${path}`),
        `${project.slug}: missing ${path}`,
      );
    assert.ok(project.introduction.length > 50);
    assert.ok(project.credits.length > 5);
  }
});
test("every original portfolio photograph is included in a project", () => {
  const included = new Set(
    projects.flatMap((p) => p.images.map((im) => im.src)),
  );
  for (const folder of ["3D", "biodesign", "sko", "workplace"])
    for (const file of readdirSync(`imgs/${folder}`)) {
      if (file.endsWith(".jpg"))
        assert.ok(
          included.has(`/imgs/${folder}/${file.replace(".jpg", ".webp")}`),
          `Unmapped image: ${file}`,
        );
    }
});
test("legacy Dropbox bundle is outside the deployed public directory", () => {
  assert.ok(!existsSync("public/assets/index-v2ilsv_b.js"));
  assert.ok(!existsSync("public/gruen.html"));
});
test("published portfolio images contain no embedded EXIF location data", async () => {
  const { default: sharp } = await import("sharp");
  for (const p of projects)
    for (const image of p.images) {
      const metadata = await sharp("public" + image.src).metadata();
      assert.equal(metadata.exif, undefined, image.src);
    }
});
