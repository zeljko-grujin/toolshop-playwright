import { test, expect } from '../fixtures/pages';

test.describe('Checkout process', () => {
    const email = 'jack@example.com';
    const firstName = 'Jack';
    const lastName = 'Howe';
    const country = 'United States of America (the)';
    const postalCode = '10001';
    const houseNumber = '1';
    test.beforeEach(async ({ page, homePage, productPage, header, cartPage }) => {
        const testProduct = 'Bolt Cutters';

        await homePage.goto();
        await homePage.openProduct(testProduct);
        await expect(page).toHaveURL(/product/);
        await productPage.addToCart();
        await expect(productPage.addedToCartMessage).toBeVisible();
        await expect(header.cartQuantity).toHaveText('1');
        await header.cartLink.click();
        await expect(page).toHaveURL('/checkout');
        await expect(cartPage.productTitles).toHaveText(testProduct);
        await expect(cartPage.cartTotal).toHaveText('$48.41');
        await cartPage.proceedToCheckoutButton.click();
    });

    test('guest can continue without login', async ({ checkoutPage }) => {
        await checkoutPage.continueAsGuest(email, firstName, lastName);
        await expect(checkoutPage.messageForContinuingAsGuest).toHaveText(`Continuing as guest: ${firstName} ${lastName} (${email})`);
        await expect(checkoutPage.guestProceedButton).toBeVisible();
    });

    test('address autofill from postal code', async ({ checkoutPage }) => {
        //Guest
        await checkoutPage.completeGuestStep(email, firstName, lastName);
        //Billing address
        await checkoutPage.completeBillingAddress(country, postalCode, houseNumber);
    });

    test('guest can finish checkout successfully', async ({ header, checkoutPage }) => {
        //Guest
        await checkoutPage.completeGuestStep(email, firstName, lastName);
        //Billing address
        await checkoutPage.completeBillingAddress(country, postalCode, houseNumber);
        //payment
        await checkoutPage.completePayment('Cash on Delivery');
        await expect(header.cartLink).toBeHidden();
    });
});

