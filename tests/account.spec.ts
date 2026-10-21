import { test, expect } from '../fixtures/pages';

test.describe('Guest', () => {
    test('is redirected to login when opening the account page', async ({ page, accountPage }) => {
        await accountPage.goto();
        await expect(page).toHaveURL(/login/);
    });
});

test.describe('logged-in user', () => {
    test.skip(!!process.env.CI, 'Toolshop rejects logins from GitHub Actions servers (401)');

    test.beforeEach(async ({ page, loginPage }) => {
        await loginPage.goto();
        await loginPage.login('customer2@practicesoftwaretesting.com', 'welcome01');
        await expect(page).toHaveURL(/account/);
    });

    test('sees the account page after login', async ({ accountPage }) => {
        await expect(accountPage.pageTitle).toHaveText('My account');
    });

    test('sees their name in the header', async ({ header }) => {
        await expect(header.userMenu).toHaveText('Jack Howe');
    });

    test('can logout', async ({ page, header }) => {
        await header.logout();
        await expect(header.signInLink).toBeVisible();
        await expect(page).toHaveURL('auth/login');
    });

    test('can open the profile page', async ({ page, accountPage }) => {
        await accountPage.goToProfile();
        await expect(page).toHaveURL('/account/profile');
    });
});
