import { writeFileSync } from "fs";

export async function inspectDOM(page) {
  const headline = await page.$eval("h1", (el) => el.innerText);
  writeFileSync("audit-results/headline.txt", headline);
}
