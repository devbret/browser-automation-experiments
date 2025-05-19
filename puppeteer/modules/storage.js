import { writeFileSync } from "fs";

export async function saveCookiesAndStorage(page) {
  const cookies = await page.cookies();
  const localStorage = await page.evaluate(() => ({ ...localStorage }));
  const sessionStorage = await page.evaluate(() => ({ ...sessionStorage }));

  writeFileSync("audit-results/cookies.json", JSON.stringify(cookies, null, 2));
  writeFileSync(
    "audit-results/local-storage.json",
    JSON.stringify(localStorage, null, 2)
  );
  writeFileSync(
    "audit-results/session-storage.json",
    JSON.stringify(sessionStorage, null, 2)
  );
}
