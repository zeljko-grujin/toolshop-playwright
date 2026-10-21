import { test, expect } from '../fixtures/pages';

test.describe('Product page and cart', () => {
    const testProduct = 'Combination Pliers';

    test.beforeEach(async ({ page, homePage }) => {
        await homePage.goto();
        await homePage.openProduct(testProduct);
        await expect(page).toHaveURL(/product/);
    });

    test('shows the product name and price', async ({ productPage }) => {
        await expect(productPage.productName).toHaveText(testProduct);
        await expect(productPage.unitPrice).toHaveText('14.15');
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
        await expect(cartPage.productTitles).toHaveText(testProduct);
        await expect(cartPage.productQuantities).toHaveValue('1');
        await expect(cartPage.cartTotal).toHaveText('$14.15');
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
    const outOfStockProduct = 'Long Nose Pliers';

    await homePage.goto();
    await homePage.openProduct(outOfStockProduct);

    await expect(productPage.outOfStockMessage).toHaveText('Out of stock');
    await expect(productPage.addToCartButton).toBeDisabled();
});

