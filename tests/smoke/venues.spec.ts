import { expect, test } from '@playwright/test';
import { applyNetworkPolicy } from '../lib/media';

// M4 behavior gate: the finder + directory reproduce the proof's semantics.

test.beforeEach(async ({ page }) => {
  await applyNetworkPolicy(page);
  await page.goto('/venues');
  await page.waitForSelector('[data-venue-list] a');
});

test('text filter narrows rows and count', async ({ page }) => {
  await page.fill('#venue-search', 'winter');
  await expect(page.locator('[data-venue-list] a:visible')).toHaveCount(1);
  await expect(page.locator('[data-result-count]')).toHaveText('1');
  await expect(page.locator('.empty-state')).toBeHidden();
});

test('type chips filter and expose pressed state', async ({ page }) => {
  await page.click('[data-venue-filter="arena"]');
  await expect(page.locator('[data-venue-filter="arena"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-venue-filter="all"]')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('[data-venue-list] a:visible')).toHaveCount(4);
});

test('no matches shows the empty state', async ({ page }) => {
  await page.fill('#venue-search', 'zzzz');
  await expect(page.locator('.empty-state')).toBeVisible();
  await expect(page.locator('[data-result-count]')).toHaveText('0');
});

test('slash focuses the finder, but not while typing', async ({ page }) => {
  await page.keyboard.press('/');
  await expect(page.locator('#venue-search')).toBeFocused();
  await page.keyboard.type('magoo/');
  await expect(page.locator('#venue-search')).toHaveValue('magoo/');
});

test('global search pipes into the finder (designed behavior, D4)', async ({ page }) => {
  await page.fill('#archive-search', 'fillmore');
  await page.press('#archive-search', 'Enter');
  await expect(page.locator('#venue-search')).toHaveValue('fillmore');
  await expect(page.locator('[data-venue-list] a:visible')).toHaveCount(2);
  await expect(page.locator('.not-implemented-notice')).toBeHidden();
  await expect(page).toHaveURL('/venues');
});

test('Barton Hall row routes in-app; undesigned rows notice', async ({ page }) => {
  await page.click('[data-venue-list] a:has-text("Barton Hall")');
  await expect(page).toHaveURL('/venues/barton-hall');
  await page.goBack();
  await page.waitForSelector('[data-venue-list] a');
  await page.click('[data-venue-list] a:has-text("Avalon Ballroom")');
  await expect(page.locator('.not-implemented-notice')).toBeVisible();
  await expect(page).toHaveURL('/venues');
});
