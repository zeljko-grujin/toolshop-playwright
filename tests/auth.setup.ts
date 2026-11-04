import { test as setup, expect } from '../fixtures/pages';
import { users } from '../test-data/users';

const authFile = 'playwright/.auth/user.json';

setup('log in and save the logged-in state', async ({ page, loginPage, header }) => {
    setup.skip(!!process.env.CI, 'Toolshop rejects logins from GitHub Actions servers (401)');

    await loginPage.goto();
    await loginPage.login(users.customer.email, users.customer.password);
    await expect(page).toHaveURL(/account/);
    await expect(header.userMenu).toContainText(users.customer.fullName);

    await page.context().storageState({ path: authFile });
});
