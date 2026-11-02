import { test, expect } from '@playwright/test';

test.describe('Products API', () => {
    test('returns the first page of products', async ({ request }) => { //request Gotov fixure iy PW, salje HTTP zahteve bez browsera. Svaki test dobija svoj, kao page. Koristi baseURL iz projekta.
        const response = await request.get('/products');
        expect(response.status()).toBe(200);

        const body = await response.json(); //Procitaj telo odgovora i od JSON-a napravi objekat   Pretvori odgovor u objekat body
        expect(body.current_page).toBe(1);
        expect(body.per_page).toBe(9);
        expect(body.data).toHaveLength(9);
        for (const product of body.data) {
            expect(product.name).toBeTruthy();
            expect(product.price).toBeGreaterThan(0);
        }
    });

    test('finds product by a search term', async ({ request }) => {
        const response = await request.get('/products/search', { params: { q: 'pliers' } });
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(0);
        for (const product of body.data) {
            expect(product.name.toLowerCase()).toContain('pliers');
        }
    });
    test('returns one product by its id', async ({ request }) => {
        const list = await request.get('/products');
        const firstProduct = (await list.json()).data[0];

        const response = await request.get(`/products/${firstProduct.id}`);
        expect(response.status()).toBe(200);

        const product = await response.json();
        expect(product.name).toBe(firstProduct.name);
        expect(product.price).toBe(firstProduct.price);
    });
    test('returns 404 for a product that does not exist', async ({ request }) => {
        const response = await request.get('/products/does-not-exist');
        expect(response.status()).toBe(404);
        expect(await response.json()).toEqual({ message: 'Requested item not found' });
    });
});
