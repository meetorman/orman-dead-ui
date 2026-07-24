import { expect, test } from '@playwright/test';
import { applyNetworkPolicy } from '../lib/media';
import { settle } from '../lib/settle';
import { type PageKey, readyFor, type StateDef, urlFor } from '../lib/targets';
import { states as showStates } from './show.states';
import { states as venueDetailStates } from './venue-detail.states';
import { states as venuesIndexStates } from './venues-index.states';

const suites: Record<PageKey, StateDef[]> = {
  'venues-index': venuesIndexStates,
  'venue-detail': venueDetailStates,
  show: showStates,
};

for (const [pageKey, states] of Object.entries(suites) as [PageKey, StateDef[]][]) {
  test.describe(pageKey, () => {
    for (const state of states) {
      const tags = state.tags?.length ? ` ${state.tags.join(' ')}` : '';
      test(`${pageKey} :: ${state.name}${tags}`, async ({ page }) => {
        const width = page.viewportSize()?.width ?? 0;
        test.skip(
          Boolean(state.minWidth && width < state.minWidth),
          'control hidden at this viewport in the proof',
        );
        await applyNetworkPolicy(page, { blockVenue3d: pageKey === 'venue-detail' });
        await page.goto(urlFor(pageKey));
        await readyFor(pageKey, page);
        await state.run(page);
        await settle(page);
        await expect(page).toHaveScreenshot(`${pageKey}--${state.name}.png`, {
          maxDiffPixels: state.maxDiffPixels ?? 0,
        });
      });
    }
  });
}
