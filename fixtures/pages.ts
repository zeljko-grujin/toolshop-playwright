import { test as base } from '@playwright/test'; //as base  Uvezi PlayWright-ov test pod drugim imenom:base
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { Header } from '../pages/Header';

type Pages = {
    loginPage: LoginPage;     //loginPage ime fixture-a     LoginPage klasa   ovaj fixture nam je zapravo objekat klase
    accountPage: AccountPage;
    homePage: HomePage;
    categoryPage: CategoryPage;
    productPage: ProductPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    header: Header;
};

export const test = base.extend<Pages>({    //Napravi novi test: sve sto ima base, plus fixture-i iz zagrade
    loginPage: async ({ page }, use) => {   //loginPage:fixture
        await use(new LoginPage(page));     //use predajemo objekat testu
    },                                      //Fixture pravi novi objekat klase LoginPage za svaki test koji ga trazi
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

export { expect } from '@playwright/test';   //prosledi Playwright-ov expect dalje
