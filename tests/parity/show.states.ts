import type { Page } from '@playwright/test';
import { anchor, settle } from '../lib/settle';
import type { StateDef } from '../lib/targets';

// Reveal the transport deterministically: play (intercepted silence), wait for
// the reveal, then pause at 0:00 — paused deck, stopped reel, 0% seek.
async function revealTransport(page: Page): Promise<void> {
  await page.click('#set-one-list .track-play');
  await page.waitForSelector('.transport:not([hidden])');
  await page.evaluate(() => {
    const audio = document.querySelector('#audio');
    if (audio instanceof HTMLAudioElement) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
  await settle(page);
}

export const states: StateDef[] = [
  {
    name: 'hero',
    // Cause: the header search glyph's SVG stroke AA wobbles ~3px across
    // runs (compositor-boundary rasterization). Real hero drift = thousands.
    maxDiffPixels: 40,
    run: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 0));
    },
  },
  {
    name: 'caption',
    run: async (page) => {
      await anchor(page, '.folio-caption');
    },
  },
  {
    name: 'story-leaf',
    run: async (page) => {
      await anchor(page, '.story-leaf');
    },
  },
  {
    name: 'setlist-annotation',
    run: async (page) => {
      await anchor(page, '.setlist-section');
    },
  },
  {
    name: 'setlist-row-details',
    run: async (page) => {
      await page.click('#set-one-list [data-details-index]');
      await anchor(page, '#set-one');
    },
  },
  {
    name: 'setlist-row-hover',
    run: async (page) => {
      await anchor(page, '#set-one');
      await page.hover('#set-one-list .tape-row');
    },
  },
  {
    name: 'setlist-set2',
    run: async (page) => {
      await anchor(page, '#set-two');
    },
  },
  {
    name: 'lineup-garcia',
    run: async (page) => {
      await anchor(page, '.lineup-section');
    },
  },
  {
    name: 'lineup-lesh',
    run: async (page) => {
      await page.click('[data-lineup-person="lesh"]');
      await anchor(page, '.lineup-dossiers');
    },
  },
  {
    name: 'instrument-hotspot',
    run: async (page) => {
      await anchor(page, '.instrument-plate');
      // Hotspots are opacity:0/pointer-events:none until the canvas has
      // alpha-hover OR :focus-within — focus is the deterministic reveal.
      const hotspot = page.locator('[data-instrument-part="obel-jacks"]');
      await hotspot.focus();
      await hotspot.click();
      await anchor(page, '.instrument-plate');
    },
  },
  {
    name: 'equipment-plates',
    run: async (page) => {
      await anchor(page, '.equipment-plates');
    },
  },
  {
    name: 'rig-notes',
    run: async (page) => {
      await anchor(page, '.rig-notes-grid');
    },
  },
  {
    name: 'rig-boundaries',
    run: async (page) => {
      await anchor(page, '.rig-boundaries');
    },
  },
  {
    name: 'schematic-default',
    run: async (page) => {
      await anchor(page, '.venue-section');
    },
  },
  {
    name: 'schematic-structure-marker',
    run: async (page) => {
      await page.click('[data-venue-view="structure"]');
      await page.click('.venue-model [data-venue-part="recording"]');
      await anchor(page, '.venue-model-panel');
    },
  },
  {
    name: 'transport-revealed',
    run: async (page) => {
      await revealTransport(page);
      await anchor(page, '.setlist-section');
    },
  },
  {
    name: 'queue-open',
    // The proof hides .transport .utility (mute + queue) at <=780px.
    minWidth: 781,
    run: async (page) => {
      await revealTransport(page);
      await page.click('#queue');
      await page.waitForSelector('#queue-drawer:not([hidden])');
      await anchor(page, '.setlist-section');
    },
  },
];
