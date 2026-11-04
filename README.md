# Toolshop - Playwright test automation

[![Playwright Tests](https://github.com/zeljko-grujin/toolshop-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/zeljko-grujin/toolshop-playwright/actions/workflows/playwright.yml)

**Latest test report:** [zeljko-grujin.github.io/toolshop-playwright](https://zeljko-grujin.github.io/toolshop-playwright/)

UI and API test automation for [Toolshop](https://practicesoftwaretesting.com), a demo e-commerce web app made for practicing test automation.
Written in TypeScript with Playwright, using the Page Object Model.

> A learning project: I built it step by step to learn Playwright with TypeScript.

## What is tested

- **Login:** valid login, invalid credentials, empty email and password
- **Account:** a guest is redirected to login; a logged-in user sees the account page and their name, can open the profile page and log out
- **Navigation:** opening a category from the menu and by its address, opening the contact page
- **Search:** only matching products are shown (one data-driven test for several search terms); a message is shown when nothing matches; search ignores case; the reset button shows all products again
- **Sorting and filters:** products are sorted by name (A-Z, Z-A) and by price (low to high, high to low); the category filter shows only products from the selected category, also after sorting
- **Product page and cart:** the product page shows the right name and price; a product can be added to the cart (also several pieces at once); the cart shows the product, its quantity and the total; a product can be removed from the cart; a product that is out of stock can't be added
- **Checkout:** a guest can check out without an account; the billing address is filled in automatically from the postal code; a guest can place an order and gets an invoice number; the cart is empty after the order
- **API:** the products list, search, one product by its id and a 404 for a product that does not exist; a login with wrong credentials gets 401, and a login gives a token that works for `/users/me`
- **API and UI together:** the home page shows the same products and prices as the API; a user created through the API can log in on the site

## Tech stack

- [Playwright Test](https://playwright.dev) with TypeScript
- GitHub Actions (CI) and GitHub Pages (test report)

## How it's built

- **Page Object Model.** Locators and page actions live in page classes (`pages/`). When the site changes, I fix one class, not every test.
- **Fixtures.** Tests get ready page objects from Playwright fixtures (`fixtures/pages.ts`), so there is no setup code in the tests.
- **Login once.** A setup project logs in and saves the logged-in state (storageState). The account tests start already logged in and don't go through the login form again.
- **No fixed waits.** Assertions use Playwright's `expect`, which retries on its own. After a search, sort or filter, the tests wait for the site's own "completed" marker.
- **Test data in one place.** Accounts, products and the API address are in `test-data/`. The password comes from a local `.env` file that is not committed.
- **Data-driven test.** One search test runs for several search terms.
- **API tests.** Playwright's `request` sends requests straight to the API, without a browser. The API tests are in their own project, so they don't wait for the login setup.
- **API and UI together.** One test checks that the home page shows the same products and prices as the API. Another one creates a new user through the API and logs in with it on the site, so it doesn't depend on an existing account.
- **CI.** GitHub Actions runs the tests on every push and on demand. The HTML report is published to GitHub Pages.

## Project structure

```
pages/      page objects (LoginPage, AccountPage, HomePage, CategoryPage, ProductPage, CartPage, CheckoutPage, Header)
fixtures/   Playwright fixtures that give each test ready page objects
tests/      test files (login, account, navigation, search, sort-filter, cart, checkout, api-and-ui), API tests (*.api.spec.ts) and the login setup (auth.setup.ts)
test-data/  test data: accounts (users.ts), products (products.ts) and the API address (api.ts)
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

Run only the API tests:

```bash
npx playwright test --project=api
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

## CI

Tests run on GitHub Actions on every push and pull request to `main`.
You can also start them by hand: **Actions → Playwright Tests → Run workflow**.
I don't run them on a schedule. Toolshop is a public demo site where anyone can add or change products, so a scheduled run could fail because of someone else's data.
After each run on `main`, the HTML report is published to GitHub Pages (link at the top). For a failed test the report has a screenshot, a video and a trace.

Toolshop rejects logins from GitHub Actions servers. The login request returns 401 (I found it with the Playwright trace viewer).
That's why the login setup, the valid login test, the tests that need a logged-in user, the API login tests and the test that logs in with a user created through the API are skipped on CI and run only locally.
The site is also behind Cloudflare, which sometimes blocks direct page loads from GitHub Actions (403), so the test that opens a category by its address is skipped on CI too.

---
Made by Željko Grujin
