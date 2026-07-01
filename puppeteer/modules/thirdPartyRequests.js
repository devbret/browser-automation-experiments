import { writeFileSync } from "fs";

export function trackThirdPartyRequests(page, targetHostname) {
  const thirdPartyRequests = [];
  page.on("request", (request) => {
    let hostname;
    try {
      hostname = new URL(request.url()).hostname;
    } catch {
      return;
    }
    const isFirstParty =
      hostname === targetHostname || hostname.endsWith(`.${targetHostname}`);
    if (!isFirstParty) {
      thirdPartyRequests.push(hostname);
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
