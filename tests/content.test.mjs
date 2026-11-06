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
test("retired application files are absent from the checkout and public site", () => {
  for (const base of ["", "public/"])
    for (const path of [
      "assets",
      "vendors",
      "materialize",
      "gruen.html",
      "index.html",
      "style.css",
    ])
      assert.ok(
        !existsSync(base + path),
        `Retired file remains: ${base}${path}`,
      );
});
test("published photographs are used, correctly sized, and contain no EXIF data", async () => {
  const { default: sharp } = await import("sharp");
  const dimensions = JSON.parse(
    readFileSync("lib/media-dimensions.json", "utf8"),
  );
  const included = new Set(
    projects.flatMap((p) => p.images.map((image) => image.src)),
  );
  for (const folder of ["3D", "biodesign", "sko", "workplace"])
    for (const file of readdirSync(`public/imgs/${folder}`))
      assert.ok(
        included.has(`/imgs/${folder}/${file}`),
        `Unused public image: ${folder}/${file}`,
      );
  for (const p of projects)
    for (const image of p.images) {
      const metadata = await sharp("public" + image.src).metadata();
      assert.equal(metadata.exif, undefined, image.src);
      assert.deepEqual(
        dimensions[image.src],
        { width: metadata.width, height: metadata.height },
        image.src,
      );
    }
});
