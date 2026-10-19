import { type Page, type Locator } from '@playwright/test';

export class Header {
    readonly page: Page;
    // Categories menu
    readonly categoriesMenu: Locator;                       //Link==button
    readonly handToolsLink: Locator;

    readonly contactLink: Locator;
    // User menu
    readonly userMenu: Locator;
    readonly signOutLink: Locator;
    readonly signInLink: Locator;
    //Cart
    readonly cartLink: Locator;
    readonly cartQuantity: Locator;

    constructor(page: Page) {
        this.page = page;

        this.categoriesMenu = page.getByTestId('nav-categories');
        this.handToolsLink = page.getByTestId('nav-hand-tools');

        this.contactLink = page.getByTestId('nav-contact');

        this.userMenu = page.getByTestId('nav-menu');
        this.signOutLink = page.getByTestId('nav-sign-out');
        this.signInLink = page.getByTestId('nav-sign-in');

        this.cartLink = page.getByTestId('nav-cart');
        this.cartQuantity = page.getByTestId('cart-quantity');
    }

    async logout() {
        await this.userMenu.click();
        await this.signOutLink.click();
    }

    async goToHandTools() {
        await this.categoriesMenu.click();
        await this.handToolsLink.click();
    }

    async goToContact() {
        await this.contactLink.click();
    }

    async openCart() {
        await this.cartLink.click();
    }
}
