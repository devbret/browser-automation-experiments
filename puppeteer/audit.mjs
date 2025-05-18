import puppeteer from "puppeteer";
import lighthouse from "lighthouse";
import { writeFileSync } from "fs";
import fetch from "node-fetch";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const url = "https://example.com/";

const browser = await puppeteer.launch({
  headless: true,
  args: ["--remote-debugging-port=9222"],
  defaultViewport: { width: 1920, height: 1080 },
});

const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle2" });

// DOM Inspection
const headline = await page.$eval("h1", (el) => el.innerText);
console.log("Headline on page:", headline);

// Page Speed / Performance Timing
const performanceTiming = await page.evaluate(() =>
  JSON.stringify(window.performance.timing)
);
writeFileSync("performance-timing.json", performanceTiming);
console.log("Saved performance timing to performance-timing.json");

// Accessibility Audit
await page.addScriptTag({ path: require.resolve("axe-core") });
const accessibility = await page.evaluate(async () => {
  return await window.axe.run();
});
writeFileSync(
  "accessibility-report.json",
  JSON.stringify(accessibility, null, 2)
);
console.log("Saved accessibility report to accessibility-report.json");

// Broken Link Detection
const links = await page.$$eval("a[href]", (anchors) =>
  anchors.map((a) => a.href)
);
const uniqueLinks = [...new Set(links)];
const linkStatuses = [];

for (const link of uniqueLinks) {
  try {
    const res = await fetch(link);
    linkStatuses.push({ link, status: res.status });
  } catch (err) {
    linkStatuses.push({ link, status: "error", message: err.message });
  }
}
writeFileSync("link-statuses.json", JSON.stringify(linkStatuses, null, 2));
console.log("Saved link status audit to link-statuses.json");

// PDF Generation
await page.setViewport({ width: 1280, height: 800 });
await page.goto(url, { waitUntil: "networkidle2" });
await page.pdf({ path: "portfolio.pdf", format: "A4" });
console.log("Saved page PDF to portfolio.pdf");

// Lighthouse Audit
const result = await lighthouse(url, {
  port: 9222,
  output: ["json"],
  logLevel: "info",
});

writeFileSync("lighthouse-report.json", result.report[0]);
console.log("Saved Lighthouse audit to lighthouse-report.json");

// Output Key Scores
const { categories } = result.lhr;
console.log(`\nScores for ${url}`);
console.log(`Performance: ${categories.performance.score * 100}`);
console.log(`Accessibility: ${categories.accessibility.score * 100}`);
console.log(`Best Practices: ${categories["best-practices"].score * 100}`);
console.log(`SEO: ${categories.seo.score * 100}`);

await browser.close();
