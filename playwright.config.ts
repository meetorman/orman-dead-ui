import { defineConfig, devices } from '@playwright/test';

// Parity: goldens are captured from the proofs (:8750) and compared against
// the app (:8761) by the SAME state scripts. Blocking projects run reduced
// motion — the proofs settle all scroll choreography under it, making every
// shot a pure function of layout. parity-motion is non-blocking.
const chromium = devices['Desktop Chrome'];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: 4,
  reporter: [['list']],
  globalSetup: './tests/lib/global-setup.ts',
  snapshotPathTemplate: '{testDir}/goldens/{projectName}/{arg}{ext}',
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 0,
      threshold: 0.01,
      animations: 'disabled',
      // Shot-time-only CSS applied to BOTH targets (see the file's banner).
      stylePath: './tests/parity/screenshot.css',
    },
  },
  use: {
    ...chromium,
    deviceScaleFactor: 1,
    trace: 'retain-on-failure',
    // Chromium rasterization is bistable across loads depending on compositor
    // layerization — text AA (LCD vs grayscale) AND composited-layer AA both
    // flip. Measured on the fixed rail: 2 distinct rasterizations without
    // flags; 20/20 identical with these two. Applied to BOTH targets.
    launchOptions: { args: ['--disable-lcd-text', '--disable-composited-antialiasing'] },
  },
  projects: [
    {
      name: 'parity-1440',
      testMatch: /parity\/.*\.spec\.ts/,
      grepInvert: /@motion/,
      use: {
        ...chromium,
        deviceScaleFactor: 1,
        viewport: { width: 1440, height: 900 },
        contextOptions: { reducedMotion: 'reduce' },
      },
    },
    {
      name: 'parity-1920',
      testMatch: /parity\/.*\.spec\.ts/,
      grepInvert: /@motion/,
      use: {
        ...chromium,
        deviceScaleFactor: 1,
        viewport: { width: 1920, height: 1080 },
        contextOptions: { reducedMotion: 'reduce' },
      },
    },
    {
      name: 'parity-390',
      testMatch: /parity\/.*\.spec\.ts/,
      grepInvert: /@motion/,
      use: {
        ...chromium,
        deviceScaleFactor: 1,
        viewport: { width: 390, height: 844 },
        contextOptions: { reducedMotion: 'reduce' },
      },
    },
    {
      name: 'parity-motion',
      testMatch: /parity\/.*\.spec\.ts/,
      grep: /@motion/,
      use: { ...chromium, deviceScaleFactor: 1, viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'smoke',
      testMatch: /smoke\/.*\.spec\.ts/,
      use: {
        ...chromium,
        deviceScaleFactor: 1,
        viewport: { width: 1440, height: 900 },
        baseURL: 'http://127.0.0.1:8761',
      },
    },
  ],
  webServer: [
    {
      command: 'python3 -m http.server 8752 --bind 127.0.0.1 --directory /home/ring/orman-dead-ui',
      url: 'http://127.0.0.1:8752/design/folio-proof.html',
      reuseExistingServer: true,
    },
    {
      // The backend (orman-dead-api repo): pages compose live from its data/dead.db.
      command:
        '/home/ring/orman-dead-api/orman_dead/api/.venv/bin/uvicorn orman_dead.api.app:app --host 127.0.0.1 --port 8735 --log-level warning',
      cwd: '/home/ring/orman-dead-api',
      url: 'http://127.0.0.1:8735/api/healthz',
      reuseExistingServer: true,
    },
    {
      command: 'pnpm --filter @orman/folio dev',
      url: 'http://127.0.0.1:8761/',
      reuseExistingServer: true,
    },
  ],
});
