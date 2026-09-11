import { writeFileSync } from "fs";

export async function startCoverage(page) {
  await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage(),
  ]);
}

export async function saveCoverageData(page) {
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
