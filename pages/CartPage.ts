import { type Page, type Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly productTitles: Locator;
    readonly productQuantities: Locator;
    readonly cartTotal: Locator;
    readonly removeButtons: Locator;
    readonly emptyCartMessage: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly continueShoppingButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.productTitles = page.getByTestId('product-title');
        this.productQuantities = page.getByTestId('product-quantity');
        this.cartTotal = page.getByTestId('cart-total');
        this.removeButtons = page.locator('.btn-danger');
        this.emptyCartMessage = page.getByText('The cart is empty. Nothing to display.');
        this.proceedToCheckoutButton = page.getByTestId('proceed-1');
        this.continueShoppingButton = page.getByTestId('continue-shopping');
    }
}
