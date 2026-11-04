import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { Header } from '../pages/Header';

type Pages = {
    loginPage: LoginPage;
    accountPage: AccountPage;
    homePage: HomePage;
    categoryPage: CategoryPage;
    productPage: ProductPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    header: Header;
};

export const test = base.extend<Pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    categoryPage: async ({ page }, use) => {
        await use(new CategoryPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    header: async ({ page }, use) => {
        await use(new Header(page));
    },
});

export { expect } from '@playwright/test';
