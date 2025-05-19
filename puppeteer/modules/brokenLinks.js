import { writeFileSync } from "fs";
import fetch from "node-fetch";

export async function detectBrokenLinks(page) {
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

  writeFileSync(
    "audit-results/link-statuses.json",
    JSON.stringify(linkStatuses, null, 2)
  );
}
