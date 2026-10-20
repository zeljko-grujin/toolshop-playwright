import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { Header } from '../pages/Header';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';

test.describe('Product page and cart', () => {
    const testProduct = 'Combination Pliers';
    let homePage: HomePage;
    let productPage: ProductPage;
    let header: Header;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        header = new Header(page);
        cartPage = new CartPage(page);
        productPage = new ProductPage(page);
        await homePage.goto();
        await homePage.openProduct(testProduct);
        await expect(page).toHaveURL(/product/);
    });

    test('shows the product name and price', async () => {
        await expect(productPage.productName).toHaveText(testProduct);
        await expect(productPage.unitPrice).toHaveText('14.15');
    });

    test('adds a product to the cart', async () => {
        await productPage.addToCart();

        await expect(productPage.addedToCartMessage).toBeVisible();
        await expect(header.cartQuantity).toHaveText('1');
    });

    test('shows the added product in the cart', async () => {
        await productPage.addToCart();

        await expect(header.cartQuantity).toHaveText('1');

        await header.openCart();
        await expect(cartPage.productTitles).toHaveText(testProduct);
        await expect(cartPage.productQuantities).toHaveValue('1');
        await expect(cartPage.cartTotal).toHaveText('$14.15');
    });

    test('adds three pieces of a product to the cart', async () => {
        await productPage.quantityInput.fill('3');
        await productPage.addToCart();
        await expect(header.cartQuantity).toHaveText('3');
        await header.openCart();
        await expect(cartPage.productQuantities).toHaveValue('3');
        await expect(cartPage.cartTotal).toHaveText('$42.45');
    });

    test('removes a product from the cart', async () => {
        await productPage.addToCart();
        await expect(header.cartQuantity).toHaveText('1');
        await header.openCart();

        await cartPage.removeButtons.first().click();
        await expect(cartPage.emptyCartMessage).toBeVisible();
        await expect(header.cartLink).toBeHidden();
    });
});

test('does not allow adding a product that is out of stock', async ({ page }) => {
    let homePage = new HomePage(page);
    let productPage = new ProductPage(page);
    const testProduct1 = 'Long Nose Pliers';

    await homePage.goto();
    await homePage.openProduct(testProduct1);

    await expect(productPage.outOfStockMessage).toHaveText('Out of stock');
    await expect(productPage.addToCartButton).toBeDisabled();
});

