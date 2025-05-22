import { Page } from '@playwright/test';

export class PageElements {
    constructor(private page: Page) {
    }

    get pageHeader(){
        return this.page.locator('header');
    }

    get pageFooter(){
        return this.page.locator('footer');
    }

    get getTitleText() {
        return this.page.locator('[data-testid="homepage-title"]');
    }

    get partnerWithUsNavBar() {
        return this.pageHeader.locator('[data-testid="nav-item-partner-with-us"]');
    }

    get aboutUsNavBar() {
        return this.pageHeader.locator('[data-testid="nav-item-about-us"]');
    }

    get loginNavBar() {
        return this.pageHeader.locator('[data-testid="nav-item-login"]');
    }

    get searchInput() {
        return this.pageHeader.locator('[data-testid="search-input"]');
    }
}