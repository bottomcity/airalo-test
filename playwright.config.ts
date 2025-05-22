import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: Number(process.env.RETRIES) || 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],

  use: {
    baseURL: process.env.BASE_URL || 'https://www.airalo.com',
    headless: process.env.HEADLESS === 'true',
    trace: (process.env.TRACE_MODE as 'on' | 'off' | 'on-first-retry' | 'retain-on-failure') || 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: {
      width: Number(process.env.VIEWPORT_WIDTH) || 1280,
      height: Number(process.env.VIEWPORT_HEIGHT) || 800,
    },
    actionTimeout: 10_000,
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});