import fs from "fs";
import path from "path";
import process from "node:process";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const IMAGES_DIR = path.join(rootDir, "src", "assets", "images");
const PROJECT_DIR = path.join(rootDir, "src", "assets", "project");

async function optimizeImages() {
  console.log("🚀 Starting Tiered Image Optimization Pipeline...\n");

  let totalOriginalBytes = 0;
  let totalOptimizedBytes = 0;

  // 1. Wallpaper assets in src/assets/images/
  // High visual impact: wallpapers need crisp display up to 2560px
  // Secondary content: wallpaper picker thumbnails only need 180px
  const wallpapers = [
    {
      source: path.join(IMAGES_DIR, "one.png"),
      fullOutput: path.join(IMAGES_DIR, "one.webp"),
      thumbOutput: path.join(IMAGES_DIR, "one-thumb.webp"),
      fullWidth: 2560,
      fullQuality: 88,
      thumbWidth: 180,
      thumbQuality: 78,
    },
    {
      source: path.join(IMAGES_DIR, "two.jpg"),
      fullOutput: path.join(IMAGES_DIR, "two.webp"),
      thumbOutput: path.join(IMAGES_DIR, "two-thumb.webp"),
      fullWidth: 2560,
      fullQuality: 88,
      thumbWidth: 180,
      thumbQuality: 78,
    },
    {
      source: path.join(IMAGES_DIR, "three.jpg"),
      fullOutput: path.join(IMAGES_DIR, "three.webp"),
      thumbOutput: path.join(IMAGES_DIR, "three-thumb.webp"),
      fullWidth: 2560,
      fullQuality: 88,
      thumbWidth: 180,
      thumbQuality: 78,
    },
  ];

  console.log("🎨 Processing Wallpapers (Full-Res + Widget Thumbnails)...");
  for (const wp of wallpapers) {
    if (!fs.existsSync(wp.source)) {
      console.warn(`⚠️ Source wallpaper not found: ${wp.source}`);
      continue;
    }

    const origSize = fs.statSync(wp.source).size;
    totalOriginalBytes += origSize;

    // High quality full-resolution wallpaper
    await sharp(wp.source)
      .resize({ width: wp.fullWidth, withoutEnlargement: true })
      .webp({ quality: wp.fullQuality, effort: 6 })
      .toFile(wp.fullOutput);
    const fullSize = fs.statSync(wp.fullOutput).size;

    // Lightweight thumbnail for ThemeWidget selector card (180w)
    await sharp(wp.source)
      .resize({ width: wp.thumbWidth, height: 112, fit: "cover" })
      .webp({ quality: wp.thumbQuality, effort: 6 })
      .toFile(wp.thumbOutput);
    const thumbSize = fs.statSync(wp.thumbOutput).size;

    totalOptimizedBytes += fullSize + thumbSize;

    console.log(
      `  ✓ ${path.basename(wp.source).padEnd(12)} -> Full: ${(fullSize / 1024).toFixed(1)} KB | Thumb: ${(thumbSize / 1024).toFixed(1)} KB (Saved ${(((origSize - (fullSize + thumbSize)) / origSize) * 100).toFixed(1)}%)`
    );
  }

  // 2. Project assets in src/assets/project/
  // Primary (high impact): modal preview full screenshots (max 1600px, quality 85)
  // Secondary: project card thumbnails (max 720px, quality 76)
  // Secondary screenshots: modal carousel extras (lekha-scratchpad, lekha-receipt)
  const projectImages = [
    {
      source: path.join(PROJECT_DIR, "Portfolio.png"),
      fullOutput: path.join(PROJECT_DIR, "portfolio.webp"),
      thumbOutput: path.join(PROJECT_DIR, "portfolio-thumb.webp"),
      fullWidth: 1600,
      fullQuality: 85,
      hasThumb: true,
      thumbWidth: 720,
      thumbQuality: 76,
    },
    {
      source: path.join(PROJECT_DIR, "agent.png"),
      fullOutput: path.join(PROJECT_DIR, "agent.webp"),
      thumbOutput: path.join(PROJECT_DIR, "agent-thumb.webp"),
      fullWidth: 1600,
      fullQuality: 85,
      hasThumb: true,
      thumbWidth: 720,
      thumbQuality: 76,
    },
    {
      source: path.join(PROJECT_DIR, "Thumbmax.png"),
      fullOutput: path.join(PROJECT_DIR, "thumbmax.webp"),
      thumbOutput: path.join(PROJECT_DIR, "thumbmax-thumb.webp"),
      fullWidth: 1600,
      fullQuality: 85,
      hasThumb: true,
      thumbWidth: 720,
      thumbQuality: 76,
    },
    {
      source: path.join(PROJECT_DIR, "lekha.png"),
      fullOutput: path.join(PROJECT_DIR, "lekha.webp"),
      thumbOutput: path.join(PROJECT_DIR, "lekha-thumb.webp"),
      fullWidth: 1440,
      fullQuality: 85,
      hasThumb: true,
      thumbWidth: 720,
      thumbQuality: 76,
    },
    {
      source: path.join(PROJECT_DIR, "lekha-scratchpad.png"),
      fullOutput: path.join(PROJECT_DIR, "lekha-scratchpad.webp"),
      fullWidth: 1280,
      fullQuality: 80,
      hasThumb: false,
    },
    {
      source: path.join(PROJECT_DIR, "lekha-receipt.png"),
      fullOutput: path.join(PROJECT_DIR, "lekha-receipt.webp"),
      fullWidth: 800,
      fullQuality: 80,
      hasThumb: false,
    },
  ];

  console.log("\n📁 Processing Project Screenshots (Full & Card Thumbnails)...");
  for (const item of projectImages) {
    if (!fs.existsSync(item.source)) {
      console.warn(`⚠️ Source project image not found: ${item.source}`);
      continue;
    }

    const origSize = fs.statSync(item.source).size;
    totalOriginalBytes += origSize;

    // Full detail image for modal inspection
    await sharp(item.source)
      .resize({ width: item.fullWidth, withoutEnlargement: true })
      .webp({ quality: item.fullQuality, effort: 6 })
      .toFile(item.fullOutput);
    const fullSize = fs.statSync(item.fullOutput).size;

    let thumbSize = 0;
    if (item.hasThumb) {
      // Sized thumbnail for card grids & mobile feeds
      await sharp(item.source)
        .resize({ width: item.thumbWidth, withoutEnlargement: true })
        .webp({ quality: item.thumbQuality, effort: 6 })
        .toFile(item.thumbOutput);
      thumbSize = fs.statSync(item.thumbOutput).size;
    }

    totalOptimizedBytes += fullSize + thumbSize;

    const savedPct = (((origSize - (fullSize + thumbSize)) / origSize) * 100).toFixed(1);
    if (item.hasThumb) {
      console.log(
        `  ✓ ${path.basename(item.source).padEnd(24)} -> Full: ${(fullSize / 1024).toFixed(1)} KB | Thumb: ${(thumbSize / 1024).toFixed(1)} KB (Saved ${savedPct}%)`
      );
    } else {
      console.log(
        `  ✓ ${path.basename(item.source).padEnd(24)} -> Carousel Slide: ${(fullSize / 1024).toFixed(1)} KB (Saved ${savedPct}%)`
      );
    }
  }

  console.log("\n==================================================");
  console.log(`Original Assets Size:  ${(totalOriginalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized Assets Size: ${(totalOptimizedBytes / 1024 / 1024).toFixed(2)} MB (${(totalOptimizedBytes / 1024).toFixed(1)} KB)`);
  console.log(
    `Total Reduction:       ${(((totalOriginalBytes - totalOptimizedBytes) / totalOriginalBytes) * 100).toFixed(1)}% saved!`
  );
  console.log("==================================================\n");
}

optimizeImages().catch((err) => {
  console.error("Optimization failed:", err);
  process.exit(1);
});
