import { writeFileSync } from "fs";
import fetch from "node-fetch";

const CONCURRENCY = 8;
const TIMEOUT_MS = 10000;

async function checkLink(link) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    let res = await fetch(link, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(link, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
      });
    }
    return { link, status: res.status };
  } catch (err) {
    const message =
      err.name === "AbortError"
        ? `timed out after ${TIMEOUT_MS}ms`
        : err.message;
    return { link, status: "error", message };
  } finally {
    clearTimeout(timer);
  }
}

export async function detectBrokenLinks(page) {
  const links = await page.$$eval("a[href]", (anchors) =>
    anchors.map((a) => a.href)
  );
  const uniqueLinks = [...new Set(links)].filter((link) =>
    /^https?:/i.test(link)
  );

  const linkStatuses = [];
  for (let i = 0; i < uniqueLinks.length; i += CONCURRENCY) {
    const batch = uniqueLinks.slice(i, i + CONCURRENCY);
    linkStatuses.push(...(await Promise.all(batch.map(checkLink))));
  }

  writeFileSync(
    "audit-results/link-statuses.json",
    JSON.stringify(linkStatuses, null, 2)
  );
}
