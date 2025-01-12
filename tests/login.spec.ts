import {
  test,
  expect,
  chromium,
  Browser,
  BrowserContext,
  Page,
} from "@playwright/test";
import { AUTH_ERROR_MESSAGE } from "app/lib/auth";
import { AssistantPagePaths, CommonPagePaths } from "helper/consts";
import { BASE_URL } from "playwright.config";

test.describe("Login Page", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  test.beforeEach(async () => {
    // Slow motion is needed to show some of the alerts
    browser = await chromium.launch({ headless: true, slowMo: 100 });
    context = await browser.newContext();
    page = await context.newPage();

    // Navigate to the login page before each test
    await page.goto(CommonPagePaths.LOGIN);
  });

  test.afterEach(async () => {
    // Cleanup after each test
    await browser.close();
  });

  test("renders login page elements correctly", async ({}) => {
    // Check if the page title and input fields are visible
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button:has-text("Přihlásit se")')).toBeVisible();
  });

  test("allows the user to toggle password visibility", async ({}) => {
    const passwordField = page.locator('input[name="password"]');
    const toggleButton = page.locator(
      'button[aria-label="toggle password visibility"]'
    );

    // Check the default password field type
    await expect(passwordField).toHaveAttribute("type", "password");

    // Toggle visibility and check
    await toggleButton.click();
    await expect(passwordField).toHaveAttribute("type", "text");

    // Toggle back to hidden
    await toggleButton.click();
    await expect(passwordField).toHaveAttribute("type", "password");
  });

  test("shows error for invalid credentials", async ({}) => {
    // Intercept reCAPTCHA API request and mock a success response
    await page.route("/api/recaptcha", async (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: "success" }),
      });
    });

    const emailField = page.locator('input[name="email"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('button:has-text("Přihlásit se")');

    // Fill in invalid credentials
    await emailField.fill("invalid@example.com");
    await passwordField.fill("wrongpassword");

    // Click login button
    await loginButton.click();

    // Expect error message to be displayed
    const errorMessage = page.locator(`text=${AUTH_ERROR_MESSAGE}`);
    await expect(errorMessage).toBeVisible({ timeout: 20_000 });
  });

  test("redirects to dashboard on successful login", async ({}) => {
    const callbackUrl = `${BASE_URL}${AssistantPagePaths.DASHBOARD}`;

    // Intercept reCAPTCHA API request and mock a success response
    await page.route("/api/recaptcha", async (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: "success" }),
      });
    });

    // Fill in valid login credentials
    await page.fill('input[name="email"]', process.env.TEST_USERNAME as string);
    await page.fill(
      'input[name="password"]',
      process.env.TEST_PASSWORD as string
    );
    await page.click('button:has-text("Přihlásit se")');

    // Wait for the redirection to the callbackUrl
    await page.waitForURL(callbackUrl, { timeout: 40_000 });

    // Assert that the URL is correct
    await expect(page).toHaveURL(callbackUrl);
  });

  test("validates required fields", async ({}) => {
    const loginButton = page.locator('button:has-text("Přihlásit se")');

    // Click login without entering any credentials
    await loginButton.click();

    // Expect validation errors
    const emailError = page.locator('input[name="email"]:invalid');
    const passwordError = page.locator('input[name="password"]:invalid');

    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });
});
