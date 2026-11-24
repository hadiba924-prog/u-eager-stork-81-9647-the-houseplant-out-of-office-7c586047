// The Houseplant Out-of-Office — make.fun entry.
//
// A single out-of-office auto-reply, written as if a houseplant sent it.
// The program writes the line to $MAKEFUN_OUTPUT_DIR/entry.txt (the
// harness's output directory), with no trailing newline, so the sealed
// gate scorer sees exactly one line of UTF-8 text, 1-120 characters.
//
// The line: a cactus, 214 days unwatered, has moved past hope and started
// photosynthesizing spite instead. It keeps the out-of-office shape
// ("Out of office ... Leave a message ...") and lets the plant's own
// biology — water, photosynthesis, wilting — carry the joke.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Out of office. I'm a cactus, day 214 without water. I've begun photosynthesizing spite. Leave a message after the wilt.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`entry must be 1-120 characters, got ${LINE.length}`);
}
if (/\r|\n/.test(LINE)) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Read the file back and confirm it holds exactly the line: no trailing
// newline, no extra bytes, no encoding surprise.
const written = readFileSync(outFile, "utf8");
if (written !== LINE) {
  throw new Error(`entry.txt does not match the line (${written.length} chars)`);
}
console.log(`wrote ${LINE.length} characters to ${outFile}`);
