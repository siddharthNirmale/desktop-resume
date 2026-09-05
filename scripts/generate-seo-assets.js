import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import toIco from "to-ico";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

// Master vector SVG for Siddharth Nirmale's architectural monogram favicon
const faviconSvg = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Squircle Base Tile: Matches the deep dark slate & border of the desktop OS widgets -->
  <rect width="32" height="32" rx="7.5" fill="#0C0D14" />
  <rect x="0.5" y="0.5" width="31" height="31" rx="7" stroke="#222536" stroke-width="1" />

  <!-- Lower Segment: Portfolio Accent Indigo (#6366F1) -->
  <path 
    d="M13 16.5H19C21.2091 16.5 23 18.2909 23 20.5C23 22.7091 21.2091 24.5 19 24.5H10" 
    stroke="#6366F1" 
    stroke-width="3.2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
  />

  <!-- Upper Segment: Brilliant Crisp White (#FFFFFF) -->
  <path 
    d="M22 8.5H13C10.7909 8.5 9 10.2909 9 12.5C9 14.7091 10.7909 16.5 13 16.5H19" 
    stroke="#FFFFFF" 
    stroke-width="3.2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
  />
</svg>
`.trim();

async function generateAssets() {
  console.log("Generating brand-new favicon suite...");

  // 1. Write the new master favicon.svg to public/
  const faviconSvgPath = path.join(publicDir, "favicon.svg");
  fs.writeFileSync(faviconSvgPath, faviconSvg);
  console.log("✓ Saved public/favicon.svg");

  const svgBuffer = Buffer.from(faviconSvg);

  // 2. Generate PNG icons (16x16, 32x32, 48x48)
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "favicon-16x16.png"), png16);

  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "favicon-32x32.png"), png32);

  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "favicon-48x48.png"), png48);

  // 3. Generate multi-resolution favicon.ico (16, 32, 48)
  const icoBuffer = await toIco([png16, png32, png48]);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
  console.log("✓ Generated public/favicon.ico (16x16, 32x32, 48x48)");

  // 4. Apple Touch Icon (180x180) - macOS / iOS style
  const appleTouchIcon = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), appleTouchIcon);
  console.log("✓ Generated public/apple-touch-icon.png (180x180)");

  // 5. Android Chrome / PWA icons (192x192, 512x512)
  const android192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "android-chrome-192x192.png"), android192);

  const android512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "android-chrome-512x512.png"), android512);
  console.log("✓ Generated public/android-chrome-192x192.png & android-chrome-512x512.png");

  // 6. Generate Open Graph preview card from the authentic desktop screenshot
  console.log("Generating Open Graph preview card from authentic portfolio screenshot...");
  const ogInputPath = path.join(publicDir, "assets/portfolio-preview.png");

  const targetW = 1140;
  const targetH = Math.round((targetW * 505) / 1024); // 562

  const frameSvg = Buffer.from(`
    <svg width="${targetW}" height="${targetH}">
      <rect width="${targetW}" height="${targetH}" rx="14" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
    </svg>
  `);

  const maskSvg = Buffer.from(
    `<svg width="${targetW}" height="${targetH}"><rect width="${targetW}" height="${targetH}" rx="14" fill="#fff"/></svg>`
  );

  const resizedScreen = await sharp(ogInputPath)
    .resize(targetW, targetH)
    .composite([
      { input: maskSvg, blend: "dest-in" },
      { input: frameSvg, blend: "over" },
    ])
    .png()
    .toBuffer();

  const ogCard = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 9, g: 10, b: 15, alpha: 1 },
    },
  })
    .composite([
      {
        input: resizedScreen,
        top: Math.round((630 - targetH) / 2),
        left: Math.round((1200 - targetW) / 2),
      },
    ])
    .png({ quality: 95 })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, "og-image.png"), ogCard);
  console.log("✓ Generated public/og-image.png (1200x630, size: " + ogCard.length + " bytes)");

  console.log("\nAll favicon and SEO assets generated successfully!");
}

generateAssets().catch((err) => {
  console.error("Asset generation error:", err);
  process.exit(1);
});
