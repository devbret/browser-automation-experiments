let totalBytes = 0;

export function trackPayloadSize(page) {
  page.on("response", async (response) => {
    try {
      const buffer = await response.buffer();
      totalBytes += buffer.length;
    } catch {}
  });
}

export function getTotalPayloadSize() {
  return totalBytes;
}
