import { type Page, type Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly unitPrice: Locator;
    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;
    readonly addedToCartMessage: Locator;
    readonly outOfStockMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.getByTestId('product-name');
        this.unitPrice = page.getByTestId('unit-price');
        this.quantityInput = page.getByTestId('quantity');
        this.addToCartButton = page.getByTestId('add-to-cart');
        this.addedToCartMessage = page.getByText('Product added to shopping cart.');
        this.outOfStockMessage = page.getByTestId('out-of-stock');
    }
    async addToCart() {
        await this.addToCartButton.click();
    }
}
