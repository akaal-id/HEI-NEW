import { execSync } from "node:child_process";
import { existsSync, lstatSync, mkdirSync, readlinkSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localModulesDir = "/tmp/hei-2026-nm";
const localNodeModules = path.join(localModulesDir, "node_modules");
const projectNodeModules = path.join(root, "node_modules");
const isICloudProject = root.includes("Mobile Documents/com~apple~CloudDocs");

function run(command, cwd = root) {
  execSync(command, { cwd, stdio: "inherit" });
}

function nextModuleIsHealthy() {
  return existsSync(
    path.join(projectNodeModules, "next/dist/lib/get-network-host.js"),
  );
}

function ensureLocalInstall() {
  mkdirSync(localModulesDir, { recursive: true });

  if (!existsSync(path.join(localModulesDir, "package-lock.json"))) {
    run(`cp "${path.join(root, "package.json")}" "${path.join(root, "package-lock.json")}" .`, localModulesDir);
  }

  if (!nextModuleIsHealthy()) {
    run("npm ci --ignore-scripts", localModulesDir);
  }
}

function linkProjectNodeModules() {
  if (existsSync(projectNodeModules)) {
    const stats = lstatSync(projectNodeModules);
    if (stats.isSymbolicLink()) {
      const target = readlinkSync(projectNodeModules);
      if (path.resolve(path.dirname(projectNodeModules), target) === localNodeModules) {
        return;
      }
      rmSync(projectNodeModules);
    } else if (!nextModuleIsHealthy()) {
      rmSync(projectNodeModules, { recursive: true, force: true });
    } else {
      return;
    }
  }

  run(`ln -sf "${localNodeModules}" "${projectNodeModules}"`);
}

if (process.platform === "darwin" && isICloudProject) {
  ensureLocalInstall();
  linkProjectNodeModules();

  for (const dir of [projectNodeModules, path.join(root, ".next")]) {
    if (!existsSync(dir)) continue;
    try {
      execSync(`xattr -w com.apple.fileprovider.ignore#P 1 "${dir}"`, {
        stdio: "ignore",
      });
    } catch {
      // Best-effort iCloud exclusion.
    }
  }
}
