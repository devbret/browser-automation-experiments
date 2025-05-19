// modules/lighthouse.js
import { writeFileSync } from "fs";
import lighthouse from "lighthouse";

export async function runLighthouseAudit(url) {
  return await lighthouse(url, {
    port: 9222,
    output: ["json"],
    logLevel: "info",
  });
}

export async function saveLighthouseScores(result) {
  const { categories } = result.lhr;
  const scores = {
    performance: categories.performance.score * 100,
    accessibility: categories.accessibility.score * 100,
    bestPractices: categories["best-practices"].score * 100,
    seo: categories.seo.score * 100,
  };
  writeFileSync(
    "audit-results/lighthouse-scores.json",
    JSON.stringify(scores, null, 2)
  );
  writeFileSync("audit-results/lighthouse-report.json", result.report[0]);
}
