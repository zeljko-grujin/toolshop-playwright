import { test, expect } from '../fixtures/pages';

test.describe('Navigation', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('can open Hand Tools from the categories menu', async ({ page, header, categoryPage }) => {

        await header.goToHandTools();
        await expect(page).toHaveURL(/hand-tools/);
        await expect(categoryPage.pageTitle).toHaveText('Category: Hand Tools');
    });

    test('can open a category directly by its address', async ({ page, categoryPage }) => {
        test.skip(!!process.env.CI, 'Cloudflare blocks direct page loads from GitHub Actions (403)');
        await categoryPage.goto('power-tools');
        await expect(page).toHaveURL('/category/power-tools');
        await expect(categoryPage.pageTitle).toHaveText('Category: Power Tools');
    });

    test('can open the contact page from the header', async ({ page, header }) => {
        await header.goToContact();
        await expect(page).toHaveURL('/contact')
    });
});
