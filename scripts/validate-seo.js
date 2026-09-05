async function testSeo() {
  const port = process.argv[2] || "5173";
  console.log(`Connecting to http://localhost:${port}/...`);
  const res = await fetch(`http://localhost:${port}/`);
  const html = await res.text();

  const checks = [
    ["Title tag", html.includes("<title>Siddharth Nirmale — Full-Stack Developer &amp; Product Designer</title>")],
    ["Meta description", html.includes('name="description"')],
    ["Canonical link", html.includes('rel="canonical" href="https://siddharthn-portfolio.vercel.app/"')],
    ["Favicon ICO link", html.includes('href="/favicon.ico"')],
    ["Apple Touch Icon", html.includes('href="/apple-touch-icon.png"')],
    ["Web Manifest link", html.includes('href="/site.webmanifest"')],
    ["OG Image", html.includes('property="og:image" content="https://siddharthn-portfolio.vercel.app/og-image.png"')],
    ["Twitter Card", html.includes('name="twitter:card" content="summary_large_image"')],
    ["JSON-LD Schema script", html.includes("application/ld+json")],
    ["Crawlable H1 fallback in root", /Siddharth Nirmale — Full-Stack Developer &amp; Product Designer\s*<\/h1>/.test(html)],
  ];

  let allPassed = true;
  checks.forEach(([name, passed]) => {
    console.log(`${passed ? "✓ PASS" : "✗ FAIL"}: ${name}`);
    if (!passed) allPassed = false;
  });

  const jsonMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1]);
      const graph = parsed["@graph"];
      console.log(`✓ PASS: JSON-LD successfully parsed with ${graph ? graph.length : 0} graph entities.`);
    } catch (err) {
      console.error("✗ FAIL: JSON-LD parse error:", err.message);
      allPassed = false;
    }
  } else {
    console.error("✗ FAIL: No JSON-LD script tag found.");
    allPassed = false;
  }

  if (!allPassed) process.exit(1);
}

testSeo();
