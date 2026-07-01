export async function generatePDF(page) {
  const previousViewport = page.viewport();
  try {
    await page.emulateMediaType("print");
    await page.pdf({ path: "audit-results/screenshot.pdf", format: "A4" });
  } finally {
    await page.emulateMediaType("screen");
    if (previousViewport) {
      await page.setViewport(previousViewport);
    }
  }
}
