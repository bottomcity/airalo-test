import { test, expect } from '@playwright/test';
import {describe} from "node:test";
import {StartPage} from "../helpers/page-helper";
import {DataForInputs} from "../enums/data-for-inputs";
import {BodyTexts, BodyTitles, ButtonTexts} from "../enums/body-titles";
import {authenticatePartner} from "../utils/utils";
import {findPackageBySlug, getAndValidateEsims, submitOrder} from "../enums/API-services";
import {packageSlugs} from "../enums/slugs";

describe('Test suit of test tasks for airalo', () => {
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

  test.only('API Automation Test exercise', async () => {
    const { apiContext } = await authenticatePartner();
    const packageSlug = packageSlugs.sevenDays;

    console.log('Posting order...');
    const packages = await findPackageBySlug(apiContext, packageSlug);
    expect(packages).toBeDefined();
    expect(packages.slug).toBe(packageSlug);

    await submitOrder(apiContext, packageSlug);

    console.log('Validating eSIMs...');
    const esims = await getAndValidateEsims(apiContext, packageSlug);

    console.log(`Success: Received ${esims.length} valid eSIMs`);
  });
});
