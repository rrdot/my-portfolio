import { cpSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";

// Standalone changes its working directory; load root env files first.
nextEnv.loadEnvConfig(fileURLToPath(new URL("../", import.meta.url)), false);

const standalone = new URL("../.next/standalone/", import.meta.url);
if (!existsSync(new URL("server.js", standalone))) {
  console.error("Production build not found. Run npm run build first.");
  process.exit(1);
}
cpSync(new URL("../public/", import.meta.url), new URL("public/", standalone), {
  recursive: true,
});
cpSync(
  new URL("../.next/static/", import.meta.url),
  new URL(".next/static/", standalone),
  { recursive: true },
);
process.env.HOSTNAME ||= "0.0.0.0";
await import(new URL("server.js", standalone));
