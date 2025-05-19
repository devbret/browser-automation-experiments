import { exec } from "child_process";

exec("node audit.mjs", (error, stdout, stderr) => {
  if (error) {
    console.error(`Audit failed: ${error.message}`);
    return;
  }
  if (stderr) console.error(`stderr: ${stderr}`);
  if (stdout) console.log(`stdout:\n${stdout}`);
});
