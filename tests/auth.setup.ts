import { test as setup, expect } from '../fixtures/pages';
import { users } from '../test-data/users';

const authFile = 'playwright/.auth/user.json';  //folder playwright pravi sam

setup('log in and save the logged-in state', async ({ page, loginPage, header }) => {
    setup.skip(!!process.env.CI, 'Toolshop rejects logins from GitHub Actions servers (401)');

    await loginPage.goto();
    await loginPage.login(users.customer.email, users.customer.password);
    await expect(page).toHaveURL(/account/);
    await expect(header.userMenu).toContainText(users.customer.fullName);

    await page.context().storageState({ path: authFile }); //Sacuvaj u fajl sve sto ovaj tab pamti, pa i token.
    //page.context() Kontekst taba: kao zaseban inkognito prozor, sa svojim cookies i svojim Local Storage-om. Svaki test dobija nov kontekst, zato su testovi nezavisni.
    // .storageState() Uzmi sve sto kontekst pamti (cookies i Local Storage) i sacuvaj.
    //{path: authFile} Gde da sacuva: u fajl sa linije 4
});
