import { writeFileSync } from "fs";

export async function getCoverageData(page) {
  await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage(),
  ]);

  await page.reload({ waitUntil: "networkidle0" });

  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage(),
  ]);

  writeFileSync(
    "audit-results/js-coverage.json",
    JSON.stringify(jsCoverage, null, 2)
  );
  writeFileSync(
    "audit-results/css-coverage.json",
    JSON.stringify(cssCoverage, null, 2)
  );
}
