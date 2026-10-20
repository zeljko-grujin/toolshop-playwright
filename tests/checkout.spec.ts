import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { ProductPage } from '../pages/ProductPage';
import { Header } from '../pages/Header';
import { HomePage } from '../pages/HomePage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout process', () => {
    let checkoutPage: CheckoutPage;
    let header: Header;
    const email = 'jack@example.com';
    const firstName = 'Jack';
    const lastName = 'Howe';
    const country = 'United States of America (the)';
    const postalCode = '10001';
    const houseNumber = '1';
    test.beforeEach(async ({ page }) => {
        checkoutPage = new CheckoutPage(page);
        header = new Header(page);
        const productPage = new ProductPage(page);
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
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

    test('guest can continue without login', async () => {
        await checkoutPage.continueAsGuest(email, firstName, lastName);
        await expect(checkoutPage.messageForContinuingAsGuest).toHaveText(`Continuing as guest: ${firstName} ${lastName} (${email})`);
        await expect(checkoutPage.guestProceedButton).toBeVisible();
    });

    test('address autofill from postal code', async () => {
        //Guest
        await checkoutPage.completeGuestStep(email, firstName, lastName);
        //Billing address
        await checkoutPage.completeBillingAddress(country, postalCode, houseNumber);
    });

    test('guest can finish checkout successfully', async () => {
        //Guest
        await checkoutPage.completeGuestStep(email, firstName, lastName);
        //Billing address
        await checkoutPage.completeBillingAddress(country, postalCode, houseNumber);
        //payment
        await checkoutPage.completePayment('Cash on Delivery');
        await expect(header.cartLink).toBeHidden();
    });
});

