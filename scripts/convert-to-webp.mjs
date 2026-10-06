import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(full));
    } else if (/\.(png|jpe?g)$/i.test(file)) {
      results.push(full);
    }
  }
  return results;
}

async function run() {
  const publicDir = path.join(process.cwd(), "public");
  const files = getFiles(publicDir);

  let initialTotalBytes = 0;
  let newTotalBytes = 0;

  console.log(`Found ${files.length} images to convert...\n`);

  for (const file of files) {
    const stat = fs.statSync(file);
    initialTotalBytes += stat.size;

    const parsed = path.parse(file);
    const outputPath = path.join(parsed.dir, `${parsed.name}.webp`);

    const image = sharp(file);
    const meta = await image.metadata();

    let transformer = sharp(file);

    // If dimensions are extremely oversized for web display (>2000px wide), constrain max width/height to 2000px preserving aspect ratio
    if (meta.width && (meta.width > 2000 || meta.height > 2000)) {
      transformer = transformer.resize({
        width: meta.width > meta.height ? 2000 : undefined,
        height: meta.height >= meta.width ? 2000 : undefined,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    // Convert to webp
    // If it's a PNG with transparency / alpha channel
    const hasAlpha = meta.hasAlpha;
    if (hasAlpha) {
      transformer = transformer.webp({
        quality: 85,
        alphaQuality: 95,
        effort: 6,
      });
    } else {
      transformer = transformer.webp({
        quality: 80,
        effort: 6,
      });
    }

    await transformer.toFile(outputPath);

    const newStat = fs.statSync(outputPath);
    newTotalBytes += newStat.size;

    const relInput = path.relative(process.cwd(), file);
    const relOutput = path.relative(process.cwd(), outputPath);
    const savingPercent = (((stat.size - newStat.size) / stat.size) * 100).toFixed(1);

    console.log(
      `✓ ${relInput} (${(stat.size / 1024).toFixed(0)} KB) -> ${relOutput} (${(newStat.size / 1024).toFixed(0)} KB) [${savingPercent}% smaller]`
    );
  }

  console.log("\n==========================================");
  console.log(`Original total: ${(initialTotalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP total:     ${(newTotalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(
    `Saved:          ${(((initialTotalBytes - newTotalBytes) / initialTotalBytes) * 100).toFixed(1)}% reduction! (${((initialTotalBytes - newTotalBytes) / 1024 / 1024).toFixed(2)} MB saved)`
  );
  console.log("==========================================");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
