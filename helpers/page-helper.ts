import { expect, Page } from '@playwright/test';
import { PageElements } from "./page-elements";


export class StartPage {
    private elements: PageElements;

    constructor(private page: Page) {
        this.elements = new PageElements(page);
    }

    async navigateTo(pageUrl: string) {
        return await this.page.goto(pageUrl);
    }

    async verifyHeaderElementsVisible() {
        await expect(this.elements.pageHeader).toBeVisible();
        await expect(this.elements.partnerWithUsNavBar).toBeVisible();
        await expect(this.elements.aboutUsNavBar).toBeVisible();
        await expect(this.elements.loginNavBar).toBeVisible();
        await expect(this.elements.searchInput).toBeVisible();
    }

    async verifyFooterVisible() {
        await expect(this.elements.pageFooter).toBeVisible();
    }

    async verifyPageAppearsProperly(expectedTitle: string) {
        const response = await this.navigateTo(this.page.url());
        expect(response.status()).toBe(200);
    }

    async verifyPageTitle(expectedTitle: string) {
        const actualTitle = this.elements.getTitleText;
        expect(actualTitle).toBe(expectedTitle);
    }

    async performSearch(searchTerm: string) {
        const searchInput = this.elements.searchInput;
        await searchInput.fill(searchTerm);
    }
}