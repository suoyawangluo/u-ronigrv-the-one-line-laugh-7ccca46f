import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one funny line, a single sentence of at most 200 characters.
// Chosen against the judge brief: it names an everyday truth everyone with
// a smartwatch recognises (the stand-up nudge), then turns the praise into
// the punchline at the end — the saddest applause — which still makes sense
// once it arrives, and every word earns its place.
const LINE =
  "My smartwatch congratulated me on standing up, which is the saddest applause I've ever received.";

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

// Read it back and verify the gate: 1-200 code points, a single line, non-blank.
const back = readFileSync(`${outDir}/entry.txt`, "utf8");
const codePoints = [...back].length;
if (back !== LINE) throw new Error("entry.txt does not match the line");
if (codePoints < 1 || codePoints > 200)
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
if (back.trim().length === 0) throw new Error("entry must not be blank");
if (back.includes("\n")) throw new Error("entry must be a single line");
if (!back.endsWith(".") || back.slice(0, -1).includes("."))
  throw new Error("entry must be exactly one sentence");
const bytes = Buffer.byteLength(back, "utf8");
console.log(`entry OK: ${codePoints} code points, ${bytes} bytes`);
console.log(back);
