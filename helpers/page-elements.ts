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

    get getTitleText(): Promise<string> {
        return this.page.locator('[data-testid="homepage-title"]').innerText()
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
        return this.page.locator('[data-testid="search-input"]');
    }

    getSimPackage(){
        return this.page.locator('[data-testid="sim-package-item"]');
    }

    getSimPackageButton(index: number) {
        return this.getSimPackage().nth(index).locator('[data-testid="esim-button"]');
    }

    getPackageTitle(title: string) {
        return this.page.locator(`[data-testid="sim-detail-header"] >>  text=${title}`);
    }

    getPackageCoverage(country: string) {
        return this.page.locator(`[data-testid="sim-detail-header"] >> text=${country}`);
    }

    getPackageData(volumeOfTraffic: string) {
        return this.page.locator(`[data-testid="sim-detail-header"] >> text=${volumeOfTraffic}`);
    }

    getPackageValidity(validity: string) {
        return this.page.locator(`[data-testid="sim-detail-header"] >> text=${validity}`);
    }

    getPackagePrice(price: string) {
        return this.page.locator(`[data-testid="sim-detail-header"] >> text=${price}`);
    }
}