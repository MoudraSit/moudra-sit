import { test, expect } from "@playwright/test";

test.describe("/prihlaseni (Login Page)", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto("/prihlaseni");
  });

  test("renders login page elements correctly", async ({ page }) => {
    // Check if the page title and input fields are visible
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button:has-text("Přihlásit se")')).toBeVisible();
  });

  test("allows the user to toggle password visibility", async ({ page }) => {
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

  test("shows error for invalid credentials", async ({ page }) => {
    const emailField = page.locator('input[name="email"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('button:has-text("Přihlásit se")');

    // Fill in invalid credentials
    await emailField.fill("invalid@example.com");
    await passwordField.fill("wrongpassword");

    // Click login button
    await loginButton.click();

    // Expect error message to be displayed
    const errorMessage = page.locator("text=Neočekávaná chyba");
    await expect(errorMessage).toBeVisible();
  });

  test("redirects to dashboard on successful login", async ({ page }) => {
    const emailField = page.locator('input[name="email"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('button:has-text("Přihlásit se")');

    // Fill in valid credentials
    await emailField.fill("valid@example.com");
    await passwordField.fill("correctpassword");

    // Mock the successful login response
    await page.route("**/api/auth/callback/credentials", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ url: "/dashboard" }),
      });
    });

    // Click login button
    await loginButton.click();

    // Expect redirection to dashboard
    await page.waitForURL("/dashboard");
    await expect(page).toHaveURL("/dashboard");
  });

  test("validates required fields", async ({ page }) => {
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
