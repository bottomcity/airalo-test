import { test, expect } from '@playwright/test';
import {describe} from "node:test";
import {StartPage} from "../helpers/page-helper";
import {DataForInputs} from "../enums/data-for-inputs";
import {BodyTexts, BodyTitles, ButtonTexts} from "../enums/body-titles";

describe('CMS and FE scenarios for custom articles', () => {
  test.beforeAll(async () => {
  })


test('UI Automation Test exercise', async ({ page }) => {

  const customPage = new StartPage(page);

  const countryForSearch = DataForInputs.japan

  await customPage.navigateTo('/');
  await customPage.verifyHeaderElementsVisible();
  await customPage.verifyFooterVisible();
  await customPage.verifyPageTitle(BodyTitles.mainTitles);
  await customPage.verifySearchInputVisible()
  await customPage.performSearch(countryForSearch)

  await customPage.verifyCountryInSearchResults(countryForSearch)
  await customPage.clickOnCountryInSearchResults(countryForSearch)

  await customPage.verifyStoreTitle(countryForSearch)
  await customPage.selectSimPackage(1, ButtonTexts.freeESIM);

  await customPage.verifyPackageDetails(
      BodyTitles.moshiMoshi,
      countryForSearch,
      BodyTexts.volumeOfTraffic,
      BodyTexts.validity,
      BodyTexts.price
      )
  });
});
