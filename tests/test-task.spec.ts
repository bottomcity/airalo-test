import { test, expect } from '@playwright/test';
import {describe} from "node:test";
import {StartPage} from "../helpers/page-helper";

describe('CMS and FE scenarios for custom articles', () => {
  test.beforeAll(async () => {
  })


test('UI Automation Test exercise', async ({ page }) => {

  const customPage = new StartPage(page);

  await customPage.navigateTo('/');

  await expect(page).toHaveTitle(/Playwright/);
});
});
