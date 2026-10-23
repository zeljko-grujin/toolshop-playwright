import { test, expect } from '../fixtures/pages';

test.describe('Search', () => {
    const searchTerms = ['pliers', 'hammer', 'drill'];

    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    for (const term of searchTerms) {
        test(`shows only products that match "${term}"`, async ({ homePage }) => {
            await homePage.search(term)
            await expect(homePage.searchCaption).toHaveText(`Searched for: ${term}`);

            const names = await homePage.productNames.allInnerTexts(); //list of names
            //allInnerTexts get the text of all elements the locator finds and return them as a list
            expect(names.length).toBeGreaterThan(0); //check that the list is not empty
            for (const name of names) {  //go throught the list, one element at a time
                expect(name.toLowerCase()).toContain(term.toLowerCase()); //toContain() is case sensitive  //toLowerCase() converts the name to lowercase
            }
        });
    }

    test('shows a message when no product matches', async ({ homePage }) => {
        await homePage.search('Zeljko');
        await expect(homePage.searchCaption).toHaveText('Searched for: Zeljko');
        await expect(homePage.noResults).toHaveText('There are no products found.')
        await expect(homePage.productNames).toHaveCount(0);
    });

    test('ignore upper and lower case', async ({ homePage }) => {
        await homePage.search('PLIERS');
        await expect(homePage.searchCaption).toHaveText('Searched for: PLIERS')

        const names = await homePage.productNames.allInnerTexts();
        expect(names.length).toBeGreaterThan(0);
        for (const name of names) {
            expect(name.toLowerCase()).toContain('pliers');
        }
    });

    test('shows all products again after the search is reset', async ({ homePage }) => {
        await homePage.search('pliers');
        await expect(homePage.searchCaption).toHaveText('Searched for: pliers')
        await homePage.resetSearch();

        await expect(homePage.searchCaption).toBeHidden();
        await expect(homePage.productNames).toHaveCount(9);
    });
});
