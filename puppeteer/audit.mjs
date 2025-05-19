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
import { trackPayloadSize } from "./modules/payloadSize.js";
import { saveCookiesAndStorage } from "./modules/storage.js";
import { extractSEOMetadata } from "./modules/seoMeta.js";
import { getCoverageData } from "./modules/coverage.js";
import { mkdirSync, existsSync } from "fs";

if (!existsSync("audit-results")) mkdirSync("audit-results");

const url = "https://example.com/";

const browser = await puppeteer.launch({
  headless: true,
  args: ["--remote-debugging-port=9222"],
  defaultViewport: { width: 1920, height: 1080 },
});

const page = await browser.newPage();

// Tracking Setup
const jsErrors = trackJSErrors(page);
const consoleMessages = trackConsoleMessages(page);
const thirdPartyRequests = trackThirdPartyRequests(page);
trackPayloadSize(page);

await page.goto(url, { waitUntil: "networkidle2" });

await inspectDOM(page);
await savePerformanceTiming(page);
await runAccessibilityAudit(page, require);
await detectBrokenLinks(page);
await generatePDF(page, url);

const lighthouseResult = await runLighthouseAudit(url);
await saveLighthouseScores(lighthouseResult);
await getWebVitals(page);
await saveCookiesAndStorage(page);
await extractSEOMetadata(page);
await getCoverageData(page);

saveJSErrors(jsErrors);
saveConsoleMessages(consoleMessages);
saveThirdPartySummary(thirdPartyRequests);

await browser.close();
