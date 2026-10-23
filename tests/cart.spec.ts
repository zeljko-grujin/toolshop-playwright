import { test, expect } from '../fixtures/pages';
import { products } from '../test-data/products';

test.describe('Product page and cart', () => {
    const testProduct = products.combinationPliers;

    test.beforeEach(async ({ page, homePage }) => {
        await homePage.goto();
        await homePage.openProduct(testProduct.name);
        await expect(page).toHaveURL(/product/);
    });

    test('shows the product name and price', async ({ productPage }) => {
        await expect(productPage.productName).toHaveText(testProduct.name);
        await expect(productPage.unitPrice).toHaveText(testProduct.price);
    });

    test('adds a product to the cart', async ({ productPage, header }) => {
        await productPage.addToCart();

        await expect(productPage.addedToCartMessage).toBeVisible();
        await expect(header.cartQuantity).toHaveText('1');
    });

    test('shows the added product in the cart', async ({ productPage, header, cartPage }) => {
        await productPage.addToCart();

        await expect(header.cartQuantity).toHaveText('1');

        await header.openCart();
        await expect(cartPage.productTitles).toHaveText(testProduct.name);
        await expect(cartPage.productQuantities).toHaveValue('1');
        await expect(cartPage.cartTotal).toHaveText('$' + testProduct.price);
    });

    test('adds three pieces of a product to the cart', async ({ productPage, header, cartPage }) => {
        await productPage.quantityInput.fill('3');
        await productPage.addToCart();
        await expect(header.cartQuantity).toHaveText('3');
        await header.openCart();
        await expect(cartPage.productQuantities).toHaveValue('3');
        await expect(cartPage.cartTotal).toHaveText('$42.45');
    });

    test('removes a product from the cart', async ({ productPage, header, cartPage }) => {
        await productPage.addToCart();
        await expect(header.cartQuantity).toHaveText('1');
        await header.openCart();

        await cartPage.removeButtons.first().click();
        await expect(cartPage.emptyCartMessage).toBeVisible();
        await expect(header.cartLink).toBeHidden();
    });
});

test('does not allow adding a product that is out of stock', async ({ homePage, productPage }) => {
    const outOfStockProduct = products.longNosePliers;

    await homePage.goto();
    await homePage.openProduct(outOfStockProduct.name);

    await expect(productPage.outOfStockMessage).toHaveText('Out of stock');
    await expect(productPage.addToCartButton).toBeDisabled();
});

