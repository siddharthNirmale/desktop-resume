import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import toIco from "to-ico";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const faviconSvgPath = path.join(publicDir, "favicon.svg");

async function generateFavicons() {
  console.log("Generating favicons and icons from:", faviconSvgPath);
  const svgBuffer = fs.readFileSync(faviconSvgPath);

  // 1. Transparent PNG icons for tabs and browser UI
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "favicon-16x16.png"), png16);

  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "favicon-32x32.png"), png32);

  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "favicon-48x48.png"), png48);

  // 2. Multi-resolution favicon.ico (16, 32, 48)
  const icoBuffer = await toIco([png16, png32, png48]);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
  console.log("Generated favicon.ico (16x16, 32x32, 48x48)");

  // 3. Apple Touch Icon (180x180) - macOS / iOS style with sleek dark backdrop and centered logo
  const appleLogoSize = 120;
  const appleLogo = await sharp(svgBuffer).resize(appleLogoSize, appleLogoSize).png().toBuffer();
  const appleTouchIcon = await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 12, g: 12, b: 16, alpha: 1 },
    },
  })
    .composite([
      {
        input: appleLogo,
        top: Math.round((180 - appleLogoSize) / 2),
        left: Math.round((180 - appleLogoSize) / 2),
      },
    ])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), appleTouchIcon);
  console.log("Generated apple-touch-icon.png (180x180)");

  // 4. Android Chrome / PWA icons (192x192 and 512x512)
  const pwa192LogoSize = 130;
  const pwa192Logo = await sharp(svgBuffer).resize(pwa192LogoSize, pwa192LogoSize).png().toBuffer();
  const android192 = await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: { r: 9, g: 9, b: 11, alpha: 1 },
    },
  })
    .composite([
      {
        input: pwa192Logo,
        top: Math.round((192 - pwa192LogoSize) / 2),
        left: Math.round((192 - pwa192LogoSize) / 2),
      },
    ])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, "android-chrome-192x192.png"), android192);

  const pwa512LogoSize = 340;
  const pwa512Logo = await sharp(svgBuffer).resize(pwa512LogoSize, pwa512LogoSize).png().toBuffer();
  const android512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 9, g: 9, b: 11, alpha: 1 },
    },
  })
    .composite([
      {
        input: pwa512Logo,
        top: Math.round((512 - pwa512LogoSize) / 2),
        left: Math.round((512 - pwa512LogoSize) / 2),
      },
    ])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, "android-chrome-512x512.png"), android512);
  console.log("Generated android-chrome-192x192.png and android-chrome-512x512.png");

  // 5. Open Graph / Twitter Preview Image (1200x630)
  // Crafting a high-impact SVG graphic with rich gradients, logo, typography, badges, and render to PNG
  const ogSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGlow" cx="20%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#1e1338" stop-opacity="0.8"/>
          <stop offset="50%" stop-color="#0e0e14" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#08080a" stop-opacity="1"/>
        </radialGradient>
        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a855f7" />
          <stop offset="100%" stop-color="#6366f1" />
        </linearGradient>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="1200" height="630" fill="#08080a" />
      <rect width="1200" height="630" fill="url(#bgGlow)" />

      <!-- Subtle Grid Pattern -->
      <g stroke="#ffffff" stroke-opacity="0.03" stroke-width="1">
        <line x1="0" y1="105" x2="1200" y2="105" />
        <line x1="0" y1="210" x2="1200" y2="210" />
        <line x1="0" y1="315" x2="1200" y2="315" />
        <line x1="0" y1="420" x2="1200" y2="420" />
        <line x1="0" y1="525" x2="1200" y2="525" />
        <line x1="200" y1="0" x2="200" y2="630" />
        <line x1="400" y1="0" x2="400" y2="630" />
        <line x1="600" y1="0" x2="600" y2="630" />
        <line x1="800" y1="0" x2="800" y2="630" />
        <line x1="1000" y1="0" x2="1000" y2="630" />
      </g>

      <!-- Decorative Ambient Glows -->
      <circle cx="1020" cy="180" r="280" fill="#8b5cf6" opacity="0.12" filter="blur(80px)" />
      <circle cx="150" cy="500" r="220" fill="#3b82f6" opacity="0.08" filter="blur(70px)" />

      <!-- Main Container Card -->
      <rect x="80" y="75" width="1040" height="480" rx="24" fill="url(#cardGrad)" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5" filter="url(#shadow)" />

      <!-- Window Titlebar Dots (macOS/Desktop theme) -->
      <circle cx="120" cy="115" r="6" fill="#ef4444" opacity="0.85" />
      <circle cx="140" cy="115" r="6" fill="#eab308" opacity="0.85" />
      <circle cx="160" cy="115" r="6" fill="#22c55e" opacity="0.85" />
      <text x="200" y="120" fill="#71717a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">siddharthn-portfolio.vercel.app</text>

      <!-- Status Indicator Pill -->
      <rect x="870" y="102" width="210" height="28" rx="14" fill="#22c55e" fill-opacity="0.12" stroke="#22c55e" stroke-opacity="0.3" stroke-width="1" />
      <circle cx="890" cy="116" r="4" fill="#22c55e" />
      <text x="905" y="120" fill="#4ade80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" letter-spacing="0.2px">Available for Work</text>

      <!-- Left Content: Identity & Details -->
      <!-- Name -->
      <text x="120" y="230" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Space Grotesk', Roboto, sans-serif" font-size="52" font-weight="800" letter-spacing="-1.5px">Siddharth Nirmale</text>

      <!-- Subtitle -->
      <text x="120" y="280" fill="url(#purpleGradient)" font-family="-apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" font-size="24" font-weight="600" letter-spacing="-0.5px">Full-Stack Developer &amp; Product Designer</text>

      <!-- Description Paragraph -->
      <text x="120" y="335" fill="#a1a1aa" font-family="-apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" font-size="17" font-weight="400">
        Crafting fluid web applications, reactive desktop interfaces, and intelligent systems.
      </text>
      <text x="120" y="365" fill="#71717a" font-family="-apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" font-size="15" font-weight="400">
        Specializing in modern React ecosystems, tactile micro-interactions, and applied AI workflows.
      </text>

      <!-- Skill Badges -->
      <g transform="translate(120, 420)">
        <!-- Badge 1: React 19 -->
        <rect x="0" y="0" width="95" height="34" rx="8" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" />
        <text x="14" y="22" fill="#e4e4e7" font-family="monospace" font-size="13" font-weight="600">React 19</text>

        <!-- Badge 2: Next.js -->
        <rect x="107" y="0" width="88" height="34" rx="8" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" />
        <text x="121" y="22" fill="#e4e4e7" font-family="monospace" font-size="13" font-weight="600">Next.js</text>

        <!-- Badge 3: TypeScript -->
        <rect x="207" y="0" width="112" height="34" rx="8" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" />
        <text x="221" y="22" fill="#e4e4e7" font-family="monospace" font-size="13" font-weight="600">TypeScript</text>

        <!-- Badge 4: Node.js -->
        <rect x="331" y="0" width="92" height="34" rx="8" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" />
        <text x="345" y="22" fill="#e4e4e7" font-family="monospace" font-size="13" font-weight="600">Node.js</text>

        <!-- Badge 5: Tailwind CSS -->
        <rect x="435" y="0" width="124" height="34" rx="8" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" />
        <text x="449" y="22" fill="#e4e4e7" font-family="monospace" font-size="13" font-weight="600">Tailwind CSS</text>

        <!-- Badge 6: AI / LLM -->
        <rect x="571" y="0" width="80" height="34" rx="8" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" />
        <text x="585" y="22" fill="#c084fc" font-family="monospace" font-size="13" font-weight="600">AI / LLM</text>
      </g>

      <!-- Right Card Graphic: Stylized Glass Monogram Box -->
      <g transform="translate(860, 210)">
        <rect x="0" y="0" width="200" height="200" rx="32" fill="#13131c" stroke="#8b5cf6" stroke-opacity="0.3" stroke-width="1.5" filter="url(#shadow)" />
        <circle cx="100" cy="100" r="80" fill="url(#purpleGradient)" opacity="0.15" />
        <!-- Stylized Emblem -->
        <path d="M100 45 L145 125 L120 125 L135 155 L75 110 L100 110 Z" fill="url(#purpleGradient)" opacity="0.9" />
        <text x="100" y="180" text-anchor="middle" fill="#a1a1aa" font-family="monospace" font-size="12" font-weight="500" letter-spacing="1.5px">INTERACTIVE OS</text>
      </g>

      <!-- Footer Bar inside card -->
      <line x1="80" y1="495" x2="1120" y2="495" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1" />
      <text x="120" y="528" fill="#71717a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13">
        github.com/siddharthNirmale · linkedin.com/in/siddharth-nirmale · Indore, India
      </text>
      <text x="1080" y="528" text-anchor="end" fill="#8b5cf6" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600">
        Explore Interactive Desktop ↗
      </text>
    </svg>
  `;

  const ogBuffer = await sharp(Buffer.from(ogSvg)).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "og-image.png"), ogBuffer);
  console.log("Generated og-image.png (1200x630, size:", ogBuffer.length, "bytes)");
}

generateFavicons()
  .then(() => console.log("All favicon & SEO graphics generated successfully!"))
  .catch((err) => {
    console.error("Error generating icons:", err);
    process.exit(1);
  });
