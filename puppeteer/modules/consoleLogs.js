import { writeFileSync } from "fs";

export function trackConsoleMessages(page) {
  const consoleMessages = [];
  page.on("console", (msg) => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
    });
  });
  return consoleMessages;
}

export function saveConsoleMessages(consoleMessages) {
  writeFileSync(
    "audit-results/console-logs.json",
    JSON.stringify(consoleMessages, null, 2)
  );
}
