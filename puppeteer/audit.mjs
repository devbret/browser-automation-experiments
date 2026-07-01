import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { trackJSErrors, saveJSErrors } from "./modules/jsErrors.js";
import {
  trackConsoleMessages,
  saveConsoleMessages,
} from "./modules/consoleLogs.js";
import {
  trackThirdPartyRequests,
  saveThirdPartySummary,
} from "./modules/thirdPartyRequests.js";
import { inspectDOM } from "./modules/domInspection.js";
import { savePerformanceTiming } from "./modules/performanceTiming.js";
import { runAccessibilityAudit } from "./modules/accessibility.js";
import { detectBrokenLinks } from "./modules/brokenLinks.js";
import { generatePDF } from "./modules/pdfGeneration.js";
import {
  runLighthouseAudit,
  saveLighthouseScores,
} from "./modules/lighthouse.js";
import { getWebVitals } from "./modules/webVitals.js";
import { trackPayloadSize, savePayloadSize } from "./modules/payloadSize.js";
import { saveCookiesAndStorage } from "./modules/storage.js";
import { extractSEOMetadata } from "./modules/seoMeta.js";
import { getCoverageData } from "./modules/coverage.js";
import { mkdirSync, existsSync } from "fs";

if (!existsSync("audit-results")) mkdirSync("audit-results");

const url = process.argv[2] ?? "https://example.com/";
const targetHostname = new URL(url).hostname;

const browser = await puppeteer.launch({
  headless: true,
  args: ["--remote-debugging-port=9222"],
  defaultViewport: { width: 1920, height: 1080 },
});

try {
  const page = await browser.newPage();

  const jsErrors = trackJSErrors(page);
  const consoleMessages = trackConsoleMessages(page);
  const thirdPartyRequests = trackThirdPartyRequests(page, targetHostname);
  const payloadSize = trackPayloadSize(page);

  await page.goto(url, { waitUntil: "networkidle2" });

  await inspectDOM(page);
  await savePerformanceTiming(page);
  await runAccessibilityAudit(page, require);
  await detectBrokenLinks(page);
  await generatePDF(page);

  const lighthouseResult = await runLighthouseAudit(url);
  await saveLighthouseScores(lighthouseResult);
  await getWebVitals(page);
  await saveCookiesAndStorage(page);
  await extractSEOMetadata(page);
  await getCoverageData(page);

  saveJSErrors(jsErrors);
  saveConsoleMessages(consoleMessages);
  saveThirdPartySummary(thirdPartyRequests);
  savePayloadSize(payloadSize);

  fs.writeFileSync(
    "audit-results/meta.json",
    JSON.stringify({ url, timestamp: new Date().toISOString() }, null, 2)
  );
} finally {
  await browser.close();
}

const sourceDir = path.resolve("audit-results");
const targetDir = path.resolve("../audit-visualizer/public/data");

fs.mkdirSync(targetDir, { recursive: true });

fs.readdirSync(targetDir).forEach((file) => {
  if (file.endsWith(".json")) {
    fs.unlinkSync(path.join(targetDir, file));
    console.log(`Deleted old file: ${file}`);
  }
});

fs.readdirSync(sourceDir).forEach((file) => {
  if (file.endsWith(".json")) {
    const src = path.join(sourceDir, file);
    const dest = path.join(targetDir, file);
    fs.copyFileSync(src, dest);
    console.log(`Copied new file: ${file}`);
  }
});
