import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Page } from '@playwright/test';

const SILENCE_WAV = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../assets/silence.wav',
);

// Local origins tests may touch. Everything else is aborted — on BOTH targets,
// so goldens and comparisons see identical network conditions.
const ALLOWED_HOSTS = new Set(['127.0.0.1:8752', '127.0.0.1:8761', '127.0.0.1:4173']);

export type NetworkPolicyOptions = {
  // Venue-detail proof only: keep the WebGL renderer from replacing the SVG
  // story art — the SVG state is the Phase-1 parity target (decision D2).
  blockVenue3d?: boolean;
};

export async function applyNetworkPolicy(
  page: Page,
  { blockVenue3d = false }: NetworkPolicyOptions = {},
): Promise<void> {
  await page.route('**/*', (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === 'archive.org' || url.hostname.endsWith('.archive.org')) {
      // Fulfill audio so real `play` events fire without touching the network.
      if (url.pathname.startsWith('/download/')) {
        return route.fulfill({ path: SILENCE_WAV, contentType: 'audio/wav' });
      }
      return route.abort();
    }
    if (blockVenue3d && url.pathname.includes('venue-3d-renderer')) {
      return route.abort();
    }
    if (!ALLOWED_HOSTS.has(url.host)) {
      return route.abort();
    }
    return route.continue();
  });
}
