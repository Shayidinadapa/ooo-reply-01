import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY = "I'm out until Monday. If it's urgent, it isn't — it's just loud.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./output";
mkdirSync(outputDir, { recursive: true });

const chars = [...REPLY].length;
if (chars < 1 || chars > 160) {
  throw new Error(`entry must be 1-160 characters, got ${chars}`);
}
if (REPLY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (REPLY.includes("\n") || REPLY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, REPLY, "utf8");

// Read back and verify what landed on disk matches exactly.
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== REPLY) {
  throw new Error("read-back verification failed: entry.txt does not match");
}
if ([...onDisk].length !== chars) {
  throw new Error("read-back verification failed: character count mismatch");
}
console.log(`Wrote entry.txt (${chars} characters, read-back verified)`);
