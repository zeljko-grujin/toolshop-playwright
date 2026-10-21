import { test, expect } from '../fixtures/pages';

test.describe('Login', () => { //start of the test group

    test.beforeEach(async ({ loginPage }) => {   //runs before each test  *(loginPage) is a LoginPage object that our fixture creates for each test and gives to us
        await loginPage.goto();
    });

    test('user can log in with valid credentials', async ({ page, header, loginPage }) => {
        test.skip(!!process.env.CI, 'Toolshop rejects logins from GitHub Actions servers (401)');

        await loginPage.login('customer2@practicesoftwaretesting.com', 'welcome01')

        await expect(page).toHaveURL(/account/);
        await expect(header.userMenu).toContainText('Jack Howe');
    });

    test('user cannot log in with invalid credentials', async ({ loginPage }) => {
        await loginPage.login('not.registered@test.com', 'WrongPassword1')

        await expect(loginPage.loginError).toContainText('Invalid email or password');

    });

    test('user cannot log in without email and password', async ({ loginPage }) => {
        await loginPage.loginButton.click();

        await expect(loginPage.emailError).toContainText('Email is required');
        await expect(loginPage.passwordError).toContainText('Password is required');
    });

});
