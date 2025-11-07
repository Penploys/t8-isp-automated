import { Page, Locator, test, expect } from "@playwright/test";

export class QuotationPage {
  readonly page: Page;
  readonly createFRButton: Locator;
  // readonly createMIButton: Locator;
  readonly frQuotation: Locator;
  // readonly miQuotation: Locator;
  readonly navQuotation: Locator;
  readonly headerQuotation: Locator;
  readonly myWorkQuotation: Locator;
  readonly searchQuotation: Locator;
  readonly validateFRQuotation: Locator;
  readonly validateMOQuotation: Locator;
  readonly validateAHQuotation: Locator;
  readonly validateMIQuotation: Locator;
  readonly validateMRQuotation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frQuotation = page.locator('.MuiBox-root.css-am8j60', { hasText: 'ประกันอัคคีภัย (FR)' });
    // this.miQuotation = page.locator('.MuiBox-root.css-am8j60', { hasText: 'ประกันภัยเบ็ดเตล็ด (MI)' });
    this.createFRButton = this.frQuotation.getByRole("button", { name: "สร้าง" });
    // this.createMIButton = this.miQuotation.getByRole("button", { name: "สร้าง" });
    this.navQuotation = page.locator("header").getByText("ใบเสนอราคา", { exact: true });
    this.headerQuotation = page.getByRole('heading', { name: 'ใบเสนอราคา' });
    this.myWorkQuotation = page.getByText('งานของฉัน', { exact: true });
    this.searchQuotation = page.getByText('ค้นหา', { exact: true }).first();
    this.validateFRQuotation = page.getByText('ประกันอัคคีภัย (FR)');
    this.validateMOQuotation = page.getByText('ประกันรถยนต์ (MO)');
    this.validateAHQuotation = page.getByText('ประกันสุขภาพ (A&H)');
    this.validateMIQuotation = page.getByText('ประกันภัยเบ็ดเตล็ด (MI)');
    this.validateMRQuotation = page.getByText('ประกันภัยทางทะเลและขนส่ง (MR)');
  }

  //สร้างใบเสนอราคา ประกันอัคคีภัย (FR) จากเมนูหลัก และ Navigate Bar
  async createFRQuotationFromMainMenu() {
    await this.createFRButton.click();
  }

  //นำเมาส์ไปชี้ที่เมนูบน navigate bar แล้วตรวจสอบหัวข้อในนั้น
  async hoverFRQuotationFromNavBar() {
    await this.navQuotation.hover();
    await expect(this.validateFRQuotation.first()).toBeVisible();
    await expect(this.validateMOQuotation.first()).toBeVisible();
    await expect(this.validateAHQuotation.first()).toBeVisible();
    await expect(this.validateMIQuotation.first()).toBeVisible();
    await expect(this.validateMRQuotation.first()).toBeVisible();
  }

  //สร้างใบเสนอราคา FR จากเมนูใน navigate bar
  async createFRQuotationFromNavBar() {
    await this.navQuotation.hover();
    await this.validateFRQuotation.first().click();
  }

  // //สร้างใบเสนอราคา ประกันภัยเบ็ดเตล็ด (MI) จากเมนูหลัก และ Navigate Bar
  // async createMIQuotationFromMainMenu() {
  //   await this.createMIButton.click();
  // }
  // async createMIQuotationFromNavBar() {
  //   await this.navQuotation.hover();
  //   await this.validateMIQuotation.first().click();
  // }

  //ตรวจสอบหน้าเมนู
  async validationQuotationMenuVisible(){
    await expect(this.navQuotation).toBeVisible();
    await expect(this.headerQuotation).toBeVisible();
    await expect(this.myWorkQuotation).toBeVisible();
    await expect(this.searchQuotation).toBeVisible();
    await expect(this.validateFRQuotation).toBeVisible();
    await expect(this.validateMOQuotation).toBeVisible();
    await expect(this.validateAHQuotation).toBeVisible();
    await expect(this.validateMIQuotation).toBeVisible();
    await expect(this.validateMRQuotation).toBeVisible();
  }
}
