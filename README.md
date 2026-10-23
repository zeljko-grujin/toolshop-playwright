# Toolshop – Playwright Test Automation

[![Playwright Tests](https://github.com/zeljko-grujin/toolshop-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/zeljko-grujin/toolshop-playwright/actions/workflows/playwright.yml)

UI test automation for [Toolshop](https://practicesoftwaretesting.com), a demo e-commerce web app built for practicing test automation.
Written in TypeScript with Playwright, using the Page Object Model.

> This is a learning project that I'm building step by step. New tests are added as I go.

## What is tested

- **Login** – valid login, invalid credentials, empty email and password
- **Account** – a guest is redirected to login; a logged-in user sees the account page and their name, can open the profile page and log out
- **Navigation** – opening a category from the menu and by its address, opening the contact page
- **Search** – only matching products are shown (one data-driven test for several search terms); a message is shown when nothing matches; search ignores case; the reset button shows all products again
- **Sorting and filters** – products are sorted by name (A–Z, Z–A) and by price (low to high, high to low); the category filter shows only products from the selected category, also after sorting
- **Product page and cart** – the product page shows the right name and price; a product can be added to the cart (also several pieces at once); the cart shows the product, its quantity and the total; a product can be removed from the cart; a product that is out of stock cannot be added
- **Checkout** – a guest can check out without an account; the billing address is filled in automatically from the postal code; a guest can place an order and gets an invoice number; the cart is empty after the order

## Tech stack

- [Playwright Test](https://playwright.dev) with TypeScript
- Page Object Model, with page objects given to tests as Playwright fixtures
- Login is done once, in a setup project; tests that need a logged-in user reuse the saved state (storageState)
- Test data in one place (`test-data/`); the password is read from a local `.env` file that is not committed
- Data-driven test: one search test runs for several search terms
- GitHub Actions (CI)

## Project structure

```
pages/      page objects (LoginPage, AccountPage, HomePage, CategoryPage, ProductPage, CartPage, CheckoutPage, Header)
fixtures/   Playwright fixtures that give each test ready page objects
tests/      test files (login, account, navigation, search, sort-filter, cart, checkout) and the login setup (auth.setup.ts)
test-data/  test data in one place: accounts (users.ts) and products (products.ts)
.github/    GitHub Actions workflow
```

## How to run

You need [Node.js](https://nodejs.org) installed.

```bash
npm ci
npx playwright install chromium
```

Create a `.env` file in the project root with the password of the Toolshop demo account `customer2@practicesoftwaretesting.com`
(the demo accounts are listed in the [Toolshop README](https://github.com/testsmith-io/practice-software-testing)):

```
CUSTOMER_PASSWORD=...
```

Run the tests:

```bash
npx playwright test
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

## CI

Tests run on GitHub Actions on every push and pull request to `main`.
Toolshop rejects logins coming from GitHub Actions servers (the login request returns 401, found with the Playwright trace viewer),
so the login setup and tests that need a logged-in user are skipped on CI and run locally.
The site is protected by Cloudflare, which sometimes blocks direct page loads from GitHub Actions servers (403), so the test that opens a category by its address is also skipped on CI.

## Next steps

- API tests
