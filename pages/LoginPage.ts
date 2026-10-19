import { type Page, type Locator } from '@playwright/test';

export class LoginPage {                      //Create the LoginPage class
    readonly page: Page;
    readonly emailInput: Locator;                     //field    what every object has (only declared here)
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;
    readonly emailError: Locator;
    readonly passwordError: Locator;
    //Runs when the object is created: fills in the fields
    constructor(page: Page) {             //*(page)comes in as a parameter and exists only while the constructor runs
        this.page = page;                    //Right side is the parameter, left side is the object's field: every object keeps its own tab, email input, etc.
        this.emailInput = page.getByTestId('email');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-submit');
        this.loginError = page.getByTestId('login-error');
        this.emailError = page.getByTestId('email-error');
        this.passwordError = page.getByTestId('password-error');
    }

    async goto() {                                //Methods: what the object can do(open the page,log in...)
        await this.page.goto('/auth/login');
    }
    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
