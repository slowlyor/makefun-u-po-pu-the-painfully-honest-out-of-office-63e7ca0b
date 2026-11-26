// The Painfully Honest Out-of-Office — make.fun entry
// Writes a single brutally honest but still polite out-of-office
// auto-reply (one sentence, at most 200 characters) to /output/entry.txt.
// Deterministic, standard library only, no network, no model calls.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "I'm out of the office, and honestly I've been counting down to this break since my inbox hit triple digits, so I'll reply once I've remembered what sunlight feels like — thank you for your patience.";

const OUTPUT_PATH = "/output/entry.txt";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space. Refuse to write anything that fails it.
const length = [...ENTRY].length;
if (length < 1 || length > 200 || ENTRY.trim().length === 0) {
  throw new Error(`Entry is ${length} characters; the gate allows 1-200.`);
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters to ${OUTPUT_PATH}`);
