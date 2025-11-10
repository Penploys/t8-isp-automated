import { Page, Locator, test, expect } from "@playwright/test";

export class FRCoverageDetailsPage {
  readonly page: Page;
  readonly houseLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.houseLabel = page.locator('label.MuiFormLabel-root', { hasText:'ที่อยู่อาศัยเป็นบ้านเดี่ยวหรือไม่' });
  }

  //ตรวจสอบแบบฟอร์มของประกันภัยประเภท "็HOUSE"
  async validateHouseForm() {
    await expect(this.houseLabel).toBeVisible();
  }
}
