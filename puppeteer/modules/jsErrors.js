import { writeFileSync } from "fs";

export function trackJSErrors(page) {
  const jsErrors = [];
  page.on("pageerror", (err) => jsErrors.push({ message: err.message }));
  return jsErrors;
}

export function saveJSErrors(jsErrors) {
  writeFileSync(
    "audit-results/js-errors.json",
    JSON.stringify(jsErrors, null, 2)
  );
}
