import { writeFileSync } from "fs";

export function trackThirdPartyRequests(page) {
  const thirdPartyRequests = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (!url.hostname.includes("example.com")) {
      thirdPartyRequests.push(url.hostname);
    }
  });
  return thirdPartyRequests;
}

export function saveThirdPartySummary(thirdPartyRequests) {
  const summary = thirdPartyRequests.reduce((acc, host) => {
    acc[host] = (acc[host] || 0) + 1;
    return acc;
  }, {});
  writeFileSync(
    "audit-results/third-party-requests.json",
    JSON.stringify(summary, null, 2)
  );
}
