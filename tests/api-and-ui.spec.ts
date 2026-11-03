import { test, expect } from '../fixtures/pages';
import { API_URL } from '../test-data/api';

type ApiProduct = {   //Opis proizvoda iz API-ja
    name: string;
    price: number;
};

test.describe('API and UI tests together', () => {
    test('the home page shows the same products as the API', async ({ request, homePage }) => {
        const response = await request.get(`${API_URL}/products`, { params: { between: 'price,1,100' } }); //Pitaj API za proizvode sa cenom od 1 do 100, isto kao sajt.
        expect(response.status()).toBe(200);
        const apiProducts: ApiProduct[] = (await response.json()).data; //Prvo sacekaj json, pa uzmi listu proizvoda
        const apiNames = apiProducts.map(product => product.name); //Od liste proizvoda napravi listu imena i cena.
        const apiPrices = apiProducts.map(product => product.price);

        await homePage.goto();
        const uiNames = await homePage.productNames.allInnerTexts();
        const uiPrices = await homePage.getPrices();

        expect(uiNames).toEqual(apiNames);
        expect(uiPrices).toEqual(apiPrices);
    });

    test('a user created through the API can log in on the site', async ({ request, page, loginPage, header }) => {
        test.skip(!!process.env.CI, 'Toolshop rejects logins from GitHub Actions servers (401)');

        const newUser = {
            first_name: 'Zeljko',
            last_name: 'Tester',
            email: `zeljko.${Date.now()}@example.com`,
            password: 'Toolshop!Zeljko2026',
        };
        const response = await request.post(`${API_URL}/users/register`, { data: newUser });
        expect(response.status()).toBe(201);

        await loginPage.goto();
        await loginPage.login(newUser.email, newUser.password);

        await expect(page).toHaveURL(/account/);
        await expect(header.userMenu).toHaveText(`${newUser.first_name} ${newUser.last_name}`);
    });
});
