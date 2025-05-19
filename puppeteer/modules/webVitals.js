import { writeFileSync } from "fs";

export async function getWebVitals(page) {
  const webVitals = await page.evaluate(() => {
    const perf = performance.getEntriesByType("paint");
    return perf.map((entry) => ({
      name: entry.name,
      startTime: entry.startTime,
    }));
  });
  writeFileSync(
    "audit-results/web-vitals.json",
    JSON.stringify(webVitals, null, 2)
  );
}
