import { expect, test } from '@playwright/test';

// The floor: every show and venue on file loads from the API. Sparse shows
// render the date/venue header + the static setlist ledger, nothing else;
// blank venues render their identity line. No goldens — behavior only.

test('sparse show renders the floor: header + static ledger, nothing else', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  await page.goto('/shows/1966-07-16');
  await expect(page.locator('.folio-hero h1')).toContainText('Fillmore Auditorium');
  expect(await page.locator('.setlist-section .tape-row').count()).toBeGreaterThan(0);
  // Static ledger: no play affordances, no transport, no schematic, no story.
  await expect(page.locator('.track-play')).toHaveCount(0);
  await expect(page.locator('.transport')).toHaveCount(0);
  await expect(page.locator('.venue-section')).toHaveCount(0);
  await expect(page.locator('.story-leaf')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('multi-show date: canonical URL and /:seq both resolve', async ({ page }) => {
  await page.goto('/shows/1970-02-13');
  await expect(page.locator('.folio-hero h1')).toContainText('Fillmore East');
  await page.goto('/shows/1970-02-13/2');
  await expect(page.locator('.folio-hero h1')).toContainText('Fillmore East');
  expect(await page.locator('.setlist-section .tape-row').count()).toBeGreaterThan(0);
});

test('blank venue loads its identity floor', async ({ page }) => {
  await page.goto('/venues/winterland-arena');
  await expect(page.locator('.museum-heading h2')).toContainText('Winterland Arena');
});

test('unknown records show the notice, no crash', async ({ page }) => {
  await page.goto('/shows/1999-01-01');
  await expect(page.locator('.not-implemented-notice')).toBeVisible();
  await page.goto('/venues/no-such-room');
  await expect(page.locator('.not-implemented-notice')).toBeVisible();
});
