import { test, expect } from '../fixtures/pages';
import { users } from '../test-data/users';

test.describe('Login', () => { //start of the test group

    test.beforeEach(async ({ loginPage }) => {   //runs before each test  *(loginPage) is a LoginPage object that our fixture creates for each test and gives to us
        await loginPage.goto();
    });

    test('user can log in with valid credentials', async ({ page, header, loginPage }) => {
        test.skip(!!process.env.CI, 'Toolshop rejects logins from GitHub Actions servers (401)');

        await loginPage.login(users.customer.email, users.customer.password)

        await expect(page).toHaveURL(/account/);
        await expect(header.userMenu).toContainText(users.customer.fullName);
    });

    test('user cannot log in with invalid credentials', async ({ loginPage }) => {
        await loginPage.login(users.notRegistered.email, users.notRegistered.password)

        await expect(loginPage.loginError).toContainText('Invalid email or password');

    });

    test('user cannot log in without email and password', async ({ loginPage }) => {
        await loginPage.loginButton.click();

        await expect(loginPage.emailError).toContainText('Email is required');
        await expect(loginPage.passwordError).toContainText('Password is required');
    });

});
