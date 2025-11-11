import { test as base } from "@playwright/test";
import { MSLoginLogoutPage } from "../elements/pages/ms-login-logout-page";
import { Configuration } from "../configurations/configuration";
import { HomePage } from "../elements/pages/home-page";
import { QuotationPage } from "../elements/pages/quotation-page";
import { FRQuotationSubClassPage } from "../elements/pages/fr-quotation-sub-class-page";
import { FRCategoryPage } from "../elements/pages/fr-select-category-page";
import { FRResponsiblePersonPage } from "../elements/pages/fr-responsible-person-page";
import { FRAssuredDetailsPage } from "../elements/pages/fr-assured-details-page";
import { FRCoverageDetailsPage } from "../elements/pages/fr-coverage-details-page";

interface TestFixtures {
  // Common components
  configuration: Configuration;

  // Pages
  msLoginLogoutPage: MSLoginLogoutPage;
  homePage: HomePage;
  quotationPage: QuotationPage;
  quotationSubClassPage: FRQuotationSubClassPage;
  frCategoryPage: FRCategoryPage;
  frResponsiblePersonPage: FRResponsiblePersonPage;
  frAssuredDetailsPage: FRAssuredDetailsPage;
  frCoverageDetailsPage: FRCoverageDetailsPage;
}

const test = base.extend<TestFixtures>({
  configuration: async ({}, use) => {
    await use(new Configuration());
  },
  msLoginLogoutPage: async ({ page }, use) => {
    await use(new MSLoginLogoutPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  quotationPage: async ({ page }, use) => {
    await use(new QuotationPage(page));
  },
  quotationSubClassPage: async ({ page }, use) => {
    await use(new FRQuotationSubClassPage(page));
  },
  frCategoryPage: async ({ page, configuration }, use) => {
    await use(new FRCategoryPage(page, configuration));
  },
  frResponsiblePersonPage: async ({ page }, use) => {
    await use(new FRResponsiblePersonPage(page));
  },
  frAssuredDetailsPage: async ({ page }, use) => {
    await use(new FRAssuredDetailsPage(page));
  },
  frCoverageDetailsPage: async ({ page }, use) => {
    await use(new FRCoverageDetailsPage(page));
  },
});
const expect = test.expect;
export { test, expect };
