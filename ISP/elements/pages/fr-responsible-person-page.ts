import { Page, Locator, test, expect } from "@playwright/test";

export class FRResponsiblePersonPage {
  readonly page: Page;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nextButton = page.getByRole("button", { name: "ถัดไป" });
  }

  //กดไปยังหน้าถัดไปพร้อมตรวจสอบชื่อหัวข้อของหน้าถัดไป
  async nextPage() {
    await this.nextButton.click();
    await expect(this.page.getByRole('heading', { name: 'รายละเอียดผู้เอาประกันภัยและสถานที่เอาประกันภัย' })).toBeVisible();
  }
}
