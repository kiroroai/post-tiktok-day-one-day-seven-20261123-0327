import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
const source = join(botDir, "VIDEO.json");
// Fail loudly on a missing or malformed VIDEO.json instead of copying garbage.
const parsed = JSON.parse(readFileSync(source, "utf8"));
if (typeof parsed.url !== "string" || !parsed.url.startsWith("https://www.tiktok.com/")) {
  throw new Error("VIDEO.json has no valid TikTok video url: " + JSON.stringify(parsed));
}
copyFileSync(source, join(outDir, "VIDEO.json"));
console.log("Copied VIDEO.json to " + join(outDir, "VIDEO.json"));
console.log("Video: " + parsed.url);
