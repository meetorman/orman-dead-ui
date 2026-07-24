import type { Page } from '@playwright/test';

// Quiescence before a shot: fonts resolved, every image decoded (or errored),
// two rAF ticks to flush any rAF-driven layout work (e.g. the venue journey).
export async function settle(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images).map((img) =>
        img.complete
          ? null
          : new Promise((resolve) => {
              img.addEventListener('load', resolve, { once: true });
              img.addEventListener('error', resolve, { once: true });
            }),
      ),
    );
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve(null))),
    );
  });
}

// Section-anchored positioning. Explicit behavior:'instant' beats the pages'
// scroll-behavior:smooth so anchoring never races the settle. The mouse is
// parked at (0,0) because a pointer left over just-clicked content makes
// :hover after scroll timing-dependent (Chromium recomputes it lazily) —
// deliberate hover states re-hover AFTER their final anchor.
export async function anchor(page: Page, selector: string): Promise<void> {
  await page
    .locator(selector)
    .first()
    .evaluate((el) => {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
  await page.mouse.move(0, 0);
  await settle(page);
}
