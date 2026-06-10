import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const script = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "ensure-local-deps.mjs",
);

spawnSync(process.execPath, [script], { stdio: "inherit" });
