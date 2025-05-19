import { writeFileSync } from "fs";

export async function savePerformanceTiming(page) {
  const timing = await page.evaluate(() =>
    JSON.stringify(window.performance.timing)
  );
  writeFileSync("audit-results/performance-timing.json", timing);
}
