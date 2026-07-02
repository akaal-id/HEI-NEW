import { spawn } from "child_process";
import os from "os";
import path from "path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const env = { ...process.env };

// Custom dist dir avoids iCloud sync issues on macOS; Windows uses the default `.next`.
if (process.platform !== "win32") {
  env.NEXT_DIST_DIR =
    process.env.NEXT_DIST_DIR ?? path.join(os.tmpdir(), "hei-2026-next");
  // Built server files live outside the project, so Node cannot walk up to
  // project/node_modules unless we add it explicitly.
  const projectNodeModules = path.join(root, "node_modules");
  env.NODE_PATH = [projectNodeModules, env.NODE_PATH]
    .filter(Boolean)
    .join(path.delimiter);
}

const child = spawn("npx", ["next", "dev", "--webpack"], {
  stdio: "inherit",
  shell: process.platform === "win32",
  cwd: root,
  env,
});

child.on("exit", (code) => process.exit(code ?? 0));
