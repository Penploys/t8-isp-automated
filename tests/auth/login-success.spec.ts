import { test, expect } from "../../fixtures/default-fixture";

test.describe('ผู้ใช้สามารถเข้าสู่ระบบผ่าน URL ที่แยกกันอย่างชัดเจน', () => {
  test('AE Valid login', async ({
    page,
    configuration,
    msLoginLogoutPage,
  }) => {
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
  });
  test.skip('SSP Valid login', async ({
    page,
    configuration,
    msLoginLogoutPage,
  }) => {
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userSSP.email,
        configuration.users.userSSP.password
    );
  });
  test.skip('UW Valid login', async ({
    page,
    configuration,
    msLoginLogoutPage,
  }) => {
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userUW.email,
        configuration.users.userUW.password
    );
  });
});