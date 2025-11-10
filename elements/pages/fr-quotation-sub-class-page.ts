import { Page, Locator, expect } from "@playwright/test";

export class FRQuotationSubClassPage {
  readonly page: Page;
  readonly fireInsuranceButton: Locator;
  readonly clButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fireInsuranceButton = page.getByRole("button", { name: "การประกันภัยอัคคีภัย (FR)"});
    this.clButton = page.getByRole("button", { name: "ธุรกิจหยุดชะงัก"});
  }

  //เลือก Sub-class แบบ FR
  async selectFireInsurance() {
    await this.fireInsuranceButton.click();
  }

  //Sub-class แบบ CL ต้องไม่สามารถเลือกได้
  async validateCLDisabled() {
    await expect(this.clButton).toBeDisabled();
  }
}
