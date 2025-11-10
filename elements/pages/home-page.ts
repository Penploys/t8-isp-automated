import { Page, Locator, test } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly startQuotationButton: Locator;
  readonly redirectMainMenuPage: Locator;
  readonly backPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.startQuotationButton = page
      .getByRole("button", { name: "เริ่มต้นใช้งาน" })
      .first();
    this.redirectMainMenuPage = page.getByText("หน้าหลัก", { exact: true });
    this.backPage = page.getByText("ย้อนกลับ", { exact: true });
  }

  //กดปุ่ม "เริ่มต้นใช้งาน" ของ "ใบเสนอราคา"
  async accessQuotation() {
    await this.startQuotationButton.click();
  }

  //กดปุ่ม "หน้าหลัก" แล้วย้อนกลับไปหน้าหลัก
  async redirectToMainMenu() {
    await this.redirectMainMenuPage.click();
  }
  //กดปุ่ม "ย้อนกลับ" แล้วย้อนกลับไปหน้าก่อน
    async backToPreviousPage() {
    await this.backPage.click();
  }
}
