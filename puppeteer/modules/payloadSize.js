import { writeFileSync } from "fs";

export function trackPayloadSize(page) {
  const state = { totalBytes: 0, responseCount: 0 };
  page.on("response", async (response) => {
    try {
      const buffer = await response.buffer();
      state.totalBytes += buffer.length;
      state.responseCount += 1;
    } catch {}
  });
  return state;
}

export function savePayloadSize(state) {
  writeFileSync(
    "audit-results/payload-size.json",
    JSON.stringify(
      {
        totalBytes: state.totalBytes,
        totalKB: +(state.totalBytes / 1024).toFixed(2),
        totalMB: +(state.totalBytes / (1024 * 1024)).toFixed(2),
        responseCount: state.responseCount,
      },
      null,
      2
    )
  );
}
