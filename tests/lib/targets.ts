import type { Page } from '@playwright/test';

// One spec, two targets. PARITY_TARGET=proof drives the hand-built proofs on
// :8750 (golden capture); PARITY_TARGET=app (default) drives the rebuilt SPA
// on :8761 (comparison). State scripts are written once against class-name
// selectors both sides share by design.

export type PageKey = 'venues-index' | 'venue-detail' | 'show';

export type StateDef = {
  name: string;
  tags?: string[];
  // Skip below this viewport width: some controls do not exist at small
  // widths BY DESIGN (e.g. the proof hides .transport .utility <=780px).
  minWidth?: number;
  // Per-shot diff budget override. Policy: only with an inline comment naming
  // the cause at the definition site; the default (0) is never loosened.
  maxDiffPixels?: number;
  run: (page: Page) => Promise<void>;
};

export const TARGET: 'proof' | 'app' = process.env.PARITY_TARGET === 'proof' ? 'proof' : 'app';

export const PROOF_ORIGIN = 'http://127.0.0.1:8752';
// Overridable so the same suite can gate the production build (vite preview).
export const APP_ORIGIN = process.env.PARITY_APP_ORIGIN ?? 'http://127.0.0.1:8761';
export const PREVIEW_ORIGIN = 'http://127.0.0.1:4173';

const PROOF_URLS: Record<PageKey, string> = {
  'venues-index': '/design/folio-venues-proof.html',
  'venue-detail': '/design/folio-venue-proof.html',
  show: '/design/folio-proof.html',
};

const APP_URLS: Record<PageKey, string> = {
  'venues-index': '/venues',
  'venue-detail': '/venues/barton-hall',
  show: '/shows/1977-05-08',
};

export function urlFor(pageKey: PageKey): string {
  return TARGET === 'proof' ? PROOF_ORIGIN + PROOF_URLS[pageKey] : APP_ORIGIN + APP_URLS[pageKey];
}

// Per-page readiness: the proofs build parts of their DOM at load (venue-page
// section surgery, JS-rendered setlist). Wait for the *final* structure both
// targets must present before any state runs.
export async function readyFor(pageKey: PageKey, page: Page): Promise<void> {
  if (pageKey === 'venues-index') {
    await page.waitForSelector('[data-venue-list] a');
  } else if (pageKey === 'venue-detail') {
    await page.waitForSelector('.venue-exhibit-stack .place-atlas');
    await page.waitForSelector('[data-story-building-art] svg');
  } else {
    await page.waitForSelector('#set-one-list li');
  }
}
