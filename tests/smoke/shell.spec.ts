import { expect, test } from '@playwright/test';
import { applyNetworkPolicy } from '../lib/media';

// M3 gate: shell + routing + link policy on the app (:8761). No screenshots —
// parity owns pixels; smoke owns behavior.

test.beforeEach(async ({ page }) => {
  await applyNetworkPolicy(page);
});

test('home renders the shell chrome', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.archive-rail .archive-sections a')).toHaveCount(5);
  await expect(page.locator('.global-header .global-search input')).toBeVisible();
  await expect(page.locator('.site-footer nav a')).toHaveCount(5);
});

test('rail Venues navigates; back/forward work', async ({ page }) => {
  await page.goto('/');
  await page.click('.archive-sections a:has-text("Venues")');
  await expect(page).toHaveURL('/venues');
  await expect(page.locator('.archive-sections a.active')).toHaveText(/Venues/);
  await page.goBack();
  await expect(page).toHaveURL('/');
  await page.goForward();
  await expect(page).toHaveURL('/venues');
});

test('rail Shows reaches the designed show record', async ({ page }) => {
  await page.goto('/');
  await page.click('.archive-sections a:has-text("Shows")');
  await expect(page).toHaveURL('/shows/1977-05-08');
});

test('undesigned destinations show the notice and do not navigate', async ({ page }) => {
  await page.goto('/');
  const cases = [
    '.archive-sections a:has-text("Songs")',
    '.archive-sections a:has-text("Heads")',
    '.archive-sections a:has-text("Rigs")',
    '.global-header nav a:has-text("About")',
    '.site-footer nav a:has-text("Songs")',
  ];
  for (const selector of cases) {
    await page.click(selector);
    await expect(page.locator('.not-implemented-notice')).toBeVisible();
    await expect(page).toHaveURL('/');
    // let the auto-hide clear before the next case
    await expect(page.locator('.not-implemented-notice')).toBeHidden({ timeout: 4000 });
  }
});

test('moon button and search submit show the notice on undesigned pages', async ({ page }) => {
  await page.goto('/');
  await page.click('button.moon');
  await expect(page.locator('.not-implemented-notice')).toBeVisible();
  await expect(page.locator('.not-implemented-notice')).toBeHidden({ timeout: 4000 });
  await page.fill('#archive-search', 'dew');
  await page.press('#archive-search', 'Enter');
  await expect(page.locator('.not-implemented-notice')).toBeVisible();
});

test('unknown route renders shell + notice', async ({ page }) => {
  await page.goto('/definitely/not/a/page');
  await expect(page.locator('.archive-rail')).toBeVisible();
  await expect(page.locator('.not-implemented-notice')).toBeVisible();
});

test('designed routes respond directly', async ({ page }) => {
  // Venue-family pages carry the collections rail; the show folio carries
  // the sections rail (proof vocabularies differ).
  for (const path of ['/venues', '/venues/barton-hall']) {
    await page.goto(path);
    await expect(page.locator('.archive-rail')).toBeVisible();
  }
  await page.goto('/shows/1977-05-08');
  await expect(page.locator('.folio-rail')).toBeVisible();
});
