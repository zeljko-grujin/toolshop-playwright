import { type Page, type Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    //Sort
    readonly sortDropdown: Locator;
    readonly productPrices: Locator;
    readonly sortingCompleted: Locator;
    //filter
    readonly filterCompleted: Locator;
    //search
    readonly searchInput: Locator;
    readonly searchResetXbutton: Locator;
    readonly searchButton: Locator;
    readonly searchCaption: Locator;
    readonly searchCompleted: Locator;
    readonly noResults: Locator;
    //Product list
    readonly productNames: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortDropdown = page.getByTestId('sort');
        this.productPrices = page.getByTestId('product-price');
        this.sortingCompleted = page.getByTestId('sorting_completed');
        this.filterCompleted = page.getByTestId('filter_completed');
        this.searchInput = page.getByTestId('search-query');
        this.searchResetXbutton = page.getByTestId('search-reset');
        this.searchButton = page.getByTestId('search-submit');
        this.searchCaption = page.getByTestId('search-caption');
        this.searchCompleted = page.getByTestId('search_completed');
        this.productNames = page.getByTestId('product-name');
        this.noResults = page.getByTestId('no-results');
    };

    async goto() {
        await this.page.goto('/');
        await this.productNames.first().waitFor();
    };
    async search(term: string) {
        await this.searchInput.fill(term);
        await this.searchButton.click();
        await this.searchCompleted.waitFor();
    };
    async resetSearch() {
        await this.searchResetXbutton.click();
    }
    async sortBy(option: string) {
        await this.sortDropdown.selectOption(option);
        await this.sortingCompleted.waitFor();
    }
    async filterByCategory(category: string) {
        await this.page.getByRole('checkbox', { name: category, exact: true }).check();
        await this.filterCompleted.waitFor();

    }
    async getPrices() {
        const priceText = await this.productPrices.allInnerTexts();
        return priceText.map(text => Number(text.replace('$', '')));
    }

    async openProduct(productName: string) {
        await this.page.getByRole('heading', { name: productName, exact: true }).click();
    }
};
