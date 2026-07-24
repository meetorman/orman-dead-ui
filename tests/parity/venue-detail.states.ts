import { anchor, settle } from '../lib/settle';
import type { StateDef } from '../lib/targets';

// Blocking states run under reduced motion: the proof settles every
// scroll-choreographed section to its revealed state, making layout a pure
// function of scroll position. @motion states run without reduced motion in
// the non-blocking parity-motion project.
export const states: StateDef[] = [
  {
    name: 'story-opening',
    run: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 0));
    },
  },
  {
    name: 'dead-story',
    run: async (page) => {
      await anchor(page, '.dead-venue-story');
    },
  },
  {
    name: 'atlas-region',
    run: async (page) => {
      await anchor(page, '.place-atlas');
    },
  },
  {
    name: 'atlas-campus',
    run: async (page) => {
      await page.click('[data-map-view="campus"]');
      await anchor(page, '.place-atlas');
    },
  },
  {
    name: 'plate-default',
    run: async (page) => {
      await anchor(page, '.venue-plate');
    },
  },
  {
    name: 'plate-structure-marker03',
    // Cause: the drawing's SVG filter chain (hall-rough displacement + active-
    // marker glow) rasterizes bistably when the compositor re-layerizes —
    // measured up to ~266px scattered across the plate under grayscale AA.
    // Real layout/copy breakage is thousands of px; budget covers the wobble.
    maxDiffPixels: 400,
    run: async (page) => {
      await page.click('[data-plate-view="structure"]');
      await page.click('.venue-plate [data-venue-part="trusses"]');
      await anchor(page, '.venue-plate');
    },
  },
  {
    name: 'show-layout',
    run: async (page) => {
      await anchor(page, '.show-layout');
    },
  },
  {
    name: 'measured-room',
    run: async (page) => {
      await anchor(page, '.measured-room');
    },
  },
  {
    name: 'place-nav-dimensions',
    run: async (page) => {
      await anchor(page, '.measured-room');
      // The fixed journey nav must have spied the section by now.
      await page.waitForFunction(() =>
        document.querySelector('[data-journey-position]')?.textContent?.includes('04 / 07'),
      );
      await settle(page);
    },
  },
  {
    name: 'timeline',
    run: async (page) => {
      await anchor(page, '.venue-timeline');
    },
  },
  {
    name: 'show-chapter',
    run: async (page) => {
      await anchor(page, '.venue-show-ledger');
    },
  },
  {
    name: 'facts',
    run: async (page) => {
      await anchor(page, '.venue-archive');
    },
  },
  {
    name: 'footer',
    run: async (page) => {
      await anchor(page, '.site-footer');
    },
  },
  // Choreography probes: fixed scroll offsets inside the pinned story stage.
  // Only offsets OUTSIDE fade ramps are screenshot-stable: mid-ramp (0.85) and
  // stage-tail (0.98, next section's staggered reveals underway) both proved
  // unstable by construction. The app's updateJourney math gets its real
  // verification in M5 via numeric --story-* custom-prop parity at fixed
  // offsets. Budget covers residual wobble. Non-blocking project.
  ...[0.25, 0.55].map(
    (fraction): StateDef => ({
      name: `story-scroll-${Math.round(fraction * 100)}`,
      tags: ['@motion'],
      maxDiffPixels: 6000,
      run: async (page) => {
        await page.evaluate((f) => {
          const stage = document.querySelector('.venue-story-opening');
          if (!(stage instanceof HTMLElement)) return;
          const start = stage.offsetTop;
          const span = Math.max(1, stage.offsetHeight - window.innerHeight);
          window.scrollTo(0, Math.round(start + span * f));
        }, fraction);
        await settle(page);
      },
    }),
  ),
];
