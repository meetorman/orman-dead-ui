import { expect, test } from '@playwright/test';
import { applyNetworkPolicy } from '../lib/media';

// M6 behavior gate: the performance ledger + transport against silenced audio,
// the lineup dossiers, the instrument plate, and the schematic.

test.beforeEach(async ({ page }) => {
  await applyNetworkPolicy(page);
  await page.goto('/shows/1977-05-08');
  await page.waitForSelector('#set-one-list li');
});

test('player reveals on first play and controls work', async ({ page }) => {
  await expect(page.locator('.transport')).toBeHidden();
  await page.click('#set-one-list .track-play');
  await expect(page.locator('.transport')).toBeVisible();
  await expect(page.locator('body')).toHaveClass(/player-revealed/);
  await expect(page.locator('#track-title')).toHaveText('New Minglewood Blues');
  await page.click('#next');
  await expect(page.locator('#track-title')).toHaveText('Loser');
  await page.click('#previous');
  await expect(page.locator('#track-title')).toHaveText('New Minglewood Blues');
  await page.click('#mute');
  await expect(page.locator('#mute span')).toHaveText('Muted');
  await page.click('#queue');
  await expect(page.locator('#queue-drawer')).toBeVisible();
  await expect(page.locator('#track-list li')).toHaveCount(23);
});

test('annotation mirrors the loaded track; set jump works', async ({ page }) => {
  await expect(page.locator('#annotation-title')).toHaveText('Fire on the Mountain');
  await page.click('[data-play-set="II"]');
  await expect(page.locator('#annotation-title')).toHaveText('“Take a Step Back”');
  await expect(page.locator('#annotation-position')).toHaveText('TAPE');
});

test('setlist details toggle exposes aria state', async ({ page }) => {
  const toggle = page.locator('#set-one-list [data-details-index]').first();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#track-details-0')).toBeVisible();
});

test('lineup tabs switch dossiers', async ({ page }) => {
  await expect(page.locator('#lineup-garcia')).toBeVisible();
  await page.click('[data-lineup-person="keith"]');
  await expect(page.locator('#lineup-keith')).toBeVisible();
  await expect(page.locator('#lineup-garcia')).toBeHidden();
  await expect(page.locator('[data-lineup-person="keith"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('instrument hotspots drive the inspector', async ({ page }) => {
  const hotspot = page.locator('[data-instrument-part="obel-jacks"]');
  await hotspot.focus();
  await hotspot.click();
  await expect(page.locator('#instrument-detail-index')).toContainText('08');
  await expect(page.locator('[data-instrument-part="obel-jacks"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('schematic markers and layers work', async ({ page }) => {
  await page.click('.venue-model [data-venue-part="recording"]');
  await expect(page.locator('[data-venue-title]')).toHaveText(
    'The two-track that outlived the room.',
  );
  await page.click('[data-venue-view="structure"]');
  await expect(page.locator('[data-venue-model]')).toHaveClass(/view-structure/);
});

test('rail sections track the hash', async ({ page }) => {
  await page.click('.archive-nav a[href="#setlist"]');
  await expect(page.locator('.archive-nav a[href="#setlist"]')).toHaveClass(/active/);
  await expect(page).toHaveURL(/#setlist/);
});

test('song-record links and citation refs show the notice', async ({ page }) => {
  const toggle = page.locator('#set-one-list [data-details-index]').first();
  await toggle.click();
  await page.click('#track-details-0 .song-record-link');
  await expect(page.locator('.not-implemented-notice')).toBeVisible();
  await expect(page).toHaveURL(/\/shows\/1977-05-08/);
});
