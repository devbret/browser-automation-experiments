export async function generatePDF(page, url) {
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(url, { waitUntil: "networkidle2" });
  await page.pdf({ path: "audit-results/screenshot.pdf", format: "A4" });
}
