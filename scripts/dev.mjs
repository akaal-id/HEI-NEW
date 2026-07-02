import { spawn } from "child_process";
import os from "os";
import path from "path";

const env = { ...process.env };

// Custom dist dir avoids iCloud sync issues on macOS; Windows uses the default `.next`.
if (process.platform !== "win32") {
  env.NEXT_DIST_DIR =
    process.env.NEXT_DIST_DIR ?? path.join(os.tmpdir(), "hei-2026-next");
}

const child = spawn("npx", ["next", "dev", "--webpack"], {
  stdio: "inherit",
  shell: true,
  env,
});

child.on("exit", (code) => process.exit(code ?? 0));
