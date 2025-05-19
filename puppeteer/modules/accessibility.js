import { writeFileSync } from "fs";

export async function runAccessibilityAudit(page, require) {
  await page.addScriptTag({ path: require.resolve("axe-core") });
  const accessibility = await page.evaluate(async () => await window.axe.run());
  writeFileSync(
    "audit-results/accessibility-report.json",
    JSON.stringify(accessibility, null, 2)
  );
}
