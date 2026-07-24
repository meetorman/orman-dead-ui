import { expect, test } from '@playwright/test';
import { applyNetworkPolicy } from '../lib/media';
import { APP_ORIGIN, PROOF_ORIGIN } from '../lib/targets';

// Numeric choreography parity: the venue story's scroll-driven CSS custom
// properties must match the proof's updateJourney math at fixed offsets —
// including mid-ramp offsets screenshots can't probe deterministically.
// Runs WITHOUT reduced motion (both sides skip the choreography under it).
const OFFSETS = [0.25, 0.55, 0.7, 0.85, 0.98];
const PROPS = [
  '--story-title-opacity',
  '--story-p1-opacity',
  '--story-p1-y',
  '--story-p2-opacity',
  '--story-p2-y',
  '--story-p3-opacity',
  '--story-p3-y',
  '--story-footer-opacity',
  '--story-footer-y',
];

test.use({ contextOptions: { reducedMotion: 'no-preference' } });

async function sample(page: import('@playwright/test').Page, url: string) {
  await applyNetworkPolicy(page, { blockVenue3d: true });
  await page.goto(url);
  await page.waitForSelector('.venue-exhibit-stack .place-atlas');
  const out: Record<string, Record<string, string>> = {};
  for (const fraction of OFFSETS) {
    await page.evaluate((f) => {
      const stage = document.querySelector('.venue-story-opening');
      if (!(stage instanceof HTMLElement)) return;
      const span = Math.max(1, stage.offsetHeight - window.innerHeight);
      window.scrollTo(0, Math.round(stage.offsetTop + span * f));
    }, fraction);
    await page.evaluate(
      () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
    );
    out[String(fraction)] = await page.evaluate((props) => {
      const stage = document.querySelector('.venue-story-opening') as HTMLElement;
      return Object.fromEntries(props.map((p) => [p, stage.style.getPropertyValue(p)]));
    }, PROPS);
  }
  return out;
}

test('story choreography math matches the proof at fixed offsets', async ({ browser }) => {
  const proofPage = await browser.newPage();
  const proof = await sample(proofPage, `${PROOF_ORIGIN}/design/folio-venue-proof.html`);
  await proofPage.close();
  const appPage = await browser.newPage();
  const app = await sample(appPage, `${APP_ORIGIN}/venues/barton-hall`);
  await appPage.close();

  for (const offset of Object.keys(proof)) {
    for (const prop of PROPS) {
      const wanted = Number.parseFloat(proof[offset]?.[prop] ?? '');
      const got = Number.parseFloat(app[offset]?.[prop] ?? '');
      expect
        .soft(Math.abs(got - wanted), `${prop} @ ${offset} (proof=${wanted} app=${got})`)
        .toBeLessThanOrEqual(0.001);
    }
  }
});
