import { test, expect } from '@playwright/test';
import { users } from '../test-data/users';

test.describe('Users API', () => {
    test.skip(!!process.env.CI, 'Toolshop rejects logins from GitHub Actions servers (401)');

    test('rejects a login with wrong credentials', async ({ request }) => {
        const response = await request.post('/users/login', {
            data: { email: users.notRegistered.email, password: users.notRegistered.password },
        });
        expect(response.status()).toBe(401);
        expect(await response.json()).toEqual({ error: 'Unauthorized' });
    });
    test('logs in and gets the logged-in user', async ({ request }) => {
        const login = await request.post('/users/login', {
            data: { email: users.customer.email, password: users.customer.password },
        });
        expect(login.status()).toBe(200);
        const token = (await login.json()).access_token;

        const response = await request.get('/users/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
        expect(response.status()).toBe(200);

        const user = await response.json();
        expect(user.email).toBe(users.customer.email);
        expect(`${user.first_name} ${user.last_name}`).toBe(users.customer.fullName);
    });
});
