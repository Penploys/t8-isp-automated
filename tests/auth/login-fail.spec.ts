import { test, expect } from "../../fixtures/default-fixture";

test.describe('Login fail', () => {
  test.skip('Login with invalid email', async ({
    page,
    configuration,
    msLoginLogoutPage,
  }) => {
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.loginEmailOnly(
        configuration.users.userInvalidEmail.email
    );
    await expect(page.getByText("This username may be incorrect. ")).toBeVisible();
  });
  test.skip('Login with invalid password', async ({
    page,
    configuration,
    msLoginLogoutPage,
  }) => {
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.loginInvalidPassword(
        configuration.users.userInvalidPassword.email,
        configuration.users.userInvalidPassword.password
    );
    await expect(page.getByText("Your account or password is incorrect.")).toBeVisible();
  });
});