import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    //sign in
    readonly continueAsGuestTab: Locator;
    readonly emailInput: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly continueAsGuestButton: Locator;
    readonly messageForContinuingAsGuest: Locator;
    readonly guestProceedButton: Locator;
    //billing address
    readonly countryDropdown: Locator;
    readonly postalCodeInput: Locator;
    readonly houseNumberInput: Locator;
    readonly streetInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly proceedToCheckoutButton: Locator;
    //payment
    readonly paymentDropdown: Locator;
    readonly checkPaymentButton: Locator;
    readonly paymentMessage: Locator;
    readonly finishPaymentButton: Locator;
    readonly confirmationOrderMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continueAsGuestTab = page.getByRole('tab', { name: 'Continue as Guest' });
        this.emailInput = page.getByTestId('guest-email');
        this.firstNameInput = page.getByTestId('guest-first-name');
        this.lastNameInput = page.getByTestId('guest-last-name');
        this.continueAsGuestButton = page.getByTestId('guest-submit');
        this.messageForContinuingAsGuest = page.getByText('Continuing as guest');
        this.guestProceedButton = page.getByTestId('proceed-2-guest');
        this.countryDropdown = page.getByTestId('country');
        this.postalCodeInput = page.getByTestId('postal_code');
        this.houseNumberInput = page.getByTestId('house_number');
        this.streetInput = page.getByTestId('street');
        this.cityInput = page.getByTestId('city');
        this.stateInput = page.getByTestId('state');
        this.proceedToCheckoutButton = page.getByTestId('proceed-3');
        this.paymentDropdown = page.getByTestId('payment-method');
        this.checkPaymentButton = page.getByTestId('finish');
        this.paymentMessage = page.getByTestId('payment-success-message');
        this.finishPaymentButton = page.getByTestId('finish');
        this.confirmationOrderMessage = page.locator('#order-confirmation');
    }

    async continueAsGuest(email: string, firstName: string, lastName: string) {
        await this.continueAsGuestTab.click();
        await this.emailInput.fill(email);
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.continueAsGuestButton.click();
    }

    async completeGuestStep(email: string, firstName: string, lastName: string) {
        await this.continueAsGuest(email, firstName, lastName);
        await expect(this.messageForContinuingAsGuest).toHaveText(`Continuing as guest: ${firstName} ${lastName} (${email})`);
        await this.guestProceedButton.click();
    }

    async completeBillingAddress(country: string, postalCode: string, houseNumber: string) {
        await expect(this.proceedToCheckoutButton).toBeDisabled();
        await this.countryDropdown.selectOption(country);
        await this.postalCodeInput.fill(postalCode);
        await this.houseNumberInput.fill(houseNumber);
        await expect(this.streetInput).not.toBeEmpty();
        await expect(this.cityInput).not.toBeEmpty();
        await expect(this.stateInput).not.toBeEmpty();
        await this.proceedToCheckoutButton.click();
    }

    async completePayment(paymentMethod: string) {
        await this.paymentDropdown.selectOption(paymentMethod);
        await this.checkPaymentButton.click();
        await expect(this.paymentMessage).toHaveText('Payment was successful');
        await this.finishPaymentButton.click();
        await expect(this.confirmationOrderMessage).toContainText('Thanks for your order! Your invoice number is INV');
    }
};



