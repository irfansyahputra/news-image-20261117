// News-image entry for make.fun news-image-20261117 (Node 22, standard library only).
// The image lives beside this file; the program copies it to the output directory
// (MAKEFUN_OUTPUT_DIR, or /output when unset):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = join(dirname(fileURLToPath(import.meta.url)), 'entry.png');
const dst = join(outDir, 'entry.png');
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

// Verify the output the gate will see: a whole PNG of at most 1 MiB.
const bytes = readFileSync(dst);
if (bytes.length > 1048576) throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
if (bytes[0] !== 0x89 || bytes[1] !== 0x50 || bytes[2] !== 0x4e || bytes[3] !== 0x47) throw new Error('entry.png is not a PNG');
