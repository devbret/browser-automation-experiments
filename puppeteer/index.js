import { spawn } from "child_process";

const args = process.argv.slice(2);

const child = spawn("node", ["audit.mjs", ...args], { stdio: "inherit" });

child.on("exit", (code) => process.exit(code ?? 0));
child.on("error", (error) => {
  console.error(`Audit failed: ${error.message}`);
  process.exit(1);
});
