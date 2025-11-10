import { test, expect } from "../fixtures/default-fixture";

test.skip("Test case template", async ({
  page,
  configuration,
  msLoginLogoutPage,
  homePage,
  quotationPage,
  quotationSubClassPage,
  frCategoryPage,
}) => {
  await page.goto(configuration.appSettings.BASE_URL);
  await msLoginLogoutPage.login(
    configuration.users.userAE.email,
    configuration.users.userAE.password
  );
  await homePage.accessQuotation();
  await quotationPage.createFRQuotationFromMainMenu();
  await quotationSubClassPage.selectFireInsurance();
  await frCategoryPage.selectCheckbox();
});
