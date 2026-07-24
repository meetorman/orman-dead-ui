import { expect, test } from '@playwright/test';
import { applyNetworkPolicy } from '../lib/media';

// M5 behavior gate: exhibits, journey nav, and cross-record routing.

test.beforeEach(async ({ page }) => {
  await applyNetworkPolicy(page, { blockVenue3d: true });
  await page.goto('/venues/barton-hall');
  await page.waitForSelector('.venue-exhibit-stack .place-atlas');
});

test('plate markers drive the inspector', async ({ page }) => {
  await expect(page.locator('[data-detail-index]')).toHaveText('01 · Open span');
  await page.click('.venue-plate [data-venue-part="trusses"]');
  await expect(page.locator('[data-detail-index]')).toHaveText('03 · Roof structure');
  await expect(page.locator('[data-detail-title]')).toHaveText('A room carried by its span.');
  await expect(page.locator('.venue-plate [data-venue-part="trusses"]')).toHaveClass(/active/);
});

test('plate and atlas layer toggles switch views', async ({ page }) => {
  await page.click('[data-plate-view="structure"]');
  await expect(page.locator('[data-plate-view="structure"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.locator('[data-hall-model]')).toHaveClass(/view-structure/);
  await page.click('[data-map-view="campus"]');
  await expect(page.locator('[data-atlas-map]')).toHaveClass(/view-campus/);
  await expect(page.locator('[data-map-layer="region"]')).toHaveAttribute('aria-hidden', 'true');
});

test('journey nav spies scroll position', async ({ page }) => {
  await expect(page.locator('[data-journey-position]')).toHaveText(/01 \/ 07/);
  await page
    .locator('.venue-timeline')
    .evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await expect(page.locator('[data-journey-position]')).toHaveText(/05 \/ 07 · Timeline/);
  await expect(page.locator('.place-nav a.is-current')).toHaveAttribute('href', '#timeline');
});

test('enter-show routes to the show record; passages notice', async ({ page }) => {
  await page.locator('.enter-show').evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await page.click('.enter-show');
  await expect(page).toHaveURL(/\/shows\/1977-05-08/);
  await page.goBack();
  await page.waitForSelector('.show-passages a');
  await page
    .locator('.show-passages a')
    .first()
    .evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await page.click('.show-passages a >> nth=0');
  await expect(page.locator('.not-implemented-notice')).toBeVisible();
  await expect(page).toHaveURL(/\/venues\/barton-hall/);
});

test('global search routes to the venues index', async ({ page }) => {
  await page.fill('#archive-search', 'winterland');
  await page.press('#archive-search', 'Enter');
  await expect(page).toHaveURL(/\/venues\?query=winterland/);
});
