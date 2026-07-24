import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const META = path.join(HERE, '../goldens/meta.json');

// Two invariants, enforced before any test runs:
// 1. Goldens are captured ONLY from the proofs. Blessing app output as golden
//    is the one fatal footgun of a one-spec/two-targets harness.
// 2. Goldens are tied to the exact Playwright (Chromium) build that captured
//    them. A version bump requires re-capture in the same commit.
export default function globalSetup(): void {
  const updating = process.argv.includes('--update-snapshots') || process.argv.includes('-u');
  const target = process.env.PARITY_TARGET === 'proof' ? 'proof' : 'app';
  const pwVersion: string = require('@playwright/test/package.json').version;

  if (updating && target !== 'proof') {
    throw new Error(
      'Refusing --update-snapshots with PARITY_TARGET=app: goldens come from the proofs. ' +
        'Use `pnpm parity:capture`.',
    );
  }

  if (updating) {
    fs.mkdirSync(path.dirname(META), { recursive: true });
    fs.writeFileSync(
      META,
      `${JSON.stringify({ playwright: pwVersion, capturedAt: new Date().toISOString() }, null, 2)}\n`,
    );
    return;
  }

  if (fs.existsSync(META)) {
    const meta = JSON.parse(fs.readFileSync(META, 'utf8')) as { playwright?: string };
    if (meta.playwright !== pwVersion) {
      throw new Error(
        `Goldens were captured with Playwright ${meta.playwright}, but ${pwVersion} is installed. ` +
          'Re-capture (`pnpm parity:capture`) in the same commit as the version bump.',
      );
    }
  }
}
