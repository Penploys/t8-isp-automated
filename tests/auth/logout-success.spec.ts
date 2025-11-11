import { test, expect } from "../../fixtures/default-fixture";

test('ผู้ใช้สามารถออกจากระบบ ISP ได้', async ({
    page,
    configuration,
    msLoginLogoutPage,
  }) => {
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.logout(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await expect(page.getByText("You signed out of your account")).toBeVisible();
  });