import { expect, Page } from '@playwright/test';
import { PageElements } from "./page-elements";


export class StartPage {
    private elements: PageElements;

    constructor(private page: Page) {
        this.elements = new PageElements(page);
    }

    async navigateTo(pageUrl: string) {
        await this.page.goto(pageUrl, { waitUntil: 'domcontentloaded' });

        await this.page.waitForSelector('[data-testid="search-input"]', {
            timeout: 10000,
            state: 'visible',
        });
    }

    async verifyHeaderElementsVisible() {
        await expect(this.elements.pageHeader).toBeVisible();
        await expect(this.elements.partnerWithUsNavBar).toBeVisible();
        await expect(this.elements.aboutUsNavBar).toBeVisible();
        await expect(this.elements.loginNavBar).toBeVisible();
    }

    async verifyFooterVisible() {
        await expect(this.elements.pageFooter).toBeVisible();
    }

    async verifyPageTitle(expectedTitle: string) {
        const actualTitle = await this.elements.getTitleText;
        expect(actualTitle).toContain(expectedTitle);
    }

    async verifySearchInputVisible(){
        await expect(this.elements.searchInput).toBeVisible();
    }

    async performSearch(expectedCountry: string) {
        const searchInput = this.elements.searchInput;
        const resultItem = this.page.locator('ul.countries-list li', {
            hasText: expectedCountry,
        });

        const typeAndWait = async () => {
            await searchInput.fill('');
            await searchInput.fill(expectedCountry);
            await expect(resultItem).toBeVisible({ timeout: 4000 });
        };

        try {
            await typeAndWait();
        } catch {
            console.warn(`[Retry] First search for "${expectedCountry}" failed, retrying...`);
            await typeAndWait();
        }
    }

    async verifyCountryInSearchResults(expectedCountry: string) {
        const resultItem = this.page.locator('ul.countries-list li', {
            hasText: expectedCountry,
        });

        await expect(resultItem).toBeVisible();
    }

    async clickOnCountryInSearchResults(countryName: string) {
        const countryOption = this.page.locator('ul.countries-list li', {
            hasText: countryName,
        });

        await countryOption.click();
    }

    async verifyStoreTitle(expectedCountry: string) {
        const titleLocator = this.page.locator('[data-testid="store-title"]');
        await expect(titleLocator).toBeVisible();
        await expect(titleLocator).toHaveText(expectedCountry);
    }

    async selectSimPackage(indexOfPackage: number, buttonText: string) {
        const esimButton = this.elements.getSimPackageButton(indexOfPackage);
        await expect(esimButton).toBeVisible();
        await expect(esimButton).toHaveText(buttonText);
        await esimButton.click();
    }

    async verifyPackageDetails(
        title: string,
        country: string,
        volumeOfTraffic: string,
        validity: string,
        price: string
    ) {
            await expect(this.elements.getPackageTitle(title)).toBeVisible();
            await expect(this.elements.getPackageCoverage(country)).toBeVisible();
            await expect(this.elements.getPackageData(volumeOfTraffic)).toBeVisible();
            await expect(this.elements.getPackageValidity(validity)).toBeVisible();
            await expect(this.elements.getPackagePrice(price)).toBeVisible();
    }
}