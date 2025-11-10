import { Page, Locator, expect, test } from "@playwright/test";
import { Configuration } from "../../configurations/configuration";

export class FRCategoryPage {
  readonly page: Page;
  readonly categories: string[];
  readonly riskcodeCategories: string[];
  readonly searchRiskCode: Locator;
  readonly fireInsuranceCategoryCheckbox: Locator;
  readonly nextButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page, configuration: Configuration) {
    this.page = page;
    this.categories = configuration.categories;
    this.riskcodeCategories = configuration.riskcodeCategories;

    this.searchRiskCode = page.getByRole('textbox', { name: "ค้นหา" });
    this.fireInsuranceCategoryCheckbox = page
      .locator('.MuiButtonBase-root.MuiListItemButton-root')
      .locator('input[type="checkbox"]');
    this.nextButton = page.getByRole("button", { name: "ถัดไป" });
    this.backButton = page.getByRole("button", { name: "ย้อนกลับ" });
  }

  //เลือก Checkbox อันแรกเสมอ เพราะจะใช้การตรวจสอบโดยการพิมพ์ชื่อหรือหมายเลขของ Risk Code ก่อนเพื่อกันการให้ Script Scroll หาจน Timeout
  async selectCheckbox() {
    await this.fireInsuranceCategoryCheckbox.first().click();
  }

  //ไปยังหน้าถัดไปพร้อม Detect ชื่อหัวข้อ
  async nextPage() {
    await this.nextButton.click();
    await expect(this.page.getByText('รายละเอียดผู้รับผิดชอบงาน')).toBeVisible();
  }

  //กดปุ่ม "ย้อนกลับ" แล้วตรวจสอบว่า Checkbox ที่เลือกไปรอบก่อนยังคงถูกเลือกอยู่
  async backPageAndValidateCheckedBox() {
    await this.backButton.click();

    //ใช้ search ชื่อเดียวกับฟังก์ชั่น searchRiskCodeBy1Code เพราะจะเช็คตัวเดิมที่เคยติ๊กไว้ หากมันอยู่ด้านล่างเพื่อไม่ให้ต้องเสียเวลา Scroll ลงไปหา
    await this.searchRiskCode.fill('1032');
    await expect(this.fireInsuranceCategoryCheckbox.first()).toBeVisible();
    const isChecked = await this.fireInsuranceCategoryCheckbox.first().isChecked();
    await expect(isChecked).toBeTruthy();
  }

  //ค้นหาทั้งชื่อและหมายเลขของ Risk Code เพื่อตรวจสอบการค้นหาทั้งสองแบบ
  async searchRiskCodeByNameOrCode() {
    await this.searchRiskCode.fill('บ้าน');
    await this.page.waitForTimeout(500);
    const grid = this.page.locator(".ReactVirtualized__Grid");
    const resultTextInput = grid.locator('.MuiBox-root:has-text("บ้าน")')
    await expect(resultTextInput.first()).toBeVisible();

    await this.searchRiskCode.fill('');
    await this.page.waitForTimeout(500);

    await this.searchRiskCode.fill('10');
    await this.page.waitForTimeout(500);
    const resultCodeInput = grid.locator('.MuiBox-root:has-text("10")')
    await expect(resultCodeInput.first()).toBeVisible();
  }

  //ค้นหาหมายเลข Risk Code แล้วเลือกแค่ Risk Code เดียว
  async searchRiskCodeBy1Code() {
    // ค้นหา index ของรหัสที่ต้องการ
    const firstIndex = this.riskcodeCategories.findIndex(code => code.startsWith('1032'));
    // ดึงรหัสจาก configuration โดยเลือกเฉพาะ 4 ตัวแรก
    const firstCode = this.riskcodeCategories[firstIndex].substring(0, 4); // จะได้ '1032'
    await this.searchRiskCode.fill(firstCode);
    // Log ทั้ง index และ text เต็ม
    console.log(`Risk Code = ${this.riskcodeCategories[firstIndex]}, index=${firstIndex}`);
    await this.page.waitForTimeout(500);
    const grid = this.page.locator(".ReactVirtualized__Grid");
    const resultInput = grid.locator(`.MuiBox-root:has-text("${firstCode}")`)
    await expect(resultInput.first()).toBeVisible();
    await this.selectCheckbox();
    await this.nextPage();
  }

  //ค้นหาหมายเลข Risk Code แล้วเลือก 2 Risk Code
  async searchRiskCodeBy2Codes() {
    // ค้นหา index ของรหัสที่ต้องการ
    const firstIndex = this.riskcodeCategories.findIndex(code => code.startsWith('1032'));
    const secondIndex = this.riskcodeCategories.findIndex(code => code.startsWith('1074'));
    // ดึงรหัสจาก configuration โดยเลือกเฉพาะ 4 ตัวแรก
    const firstCode = this.riskcodeCategories[firstIndex].substring(0, 4); // จะได้ '1032'
    const secondCode = this.riskcodeCategories[secondIndex].substring(0, 4); // จะได้ '1074'
    await this.searchRiskCode.fill(firstCode);
    // Log ทั้ง index และ text เต็ม
    console.log(`Risk Code = ${this.riskcodeCategories[firstIndex]}, index=${firstIndex}`);
    await this.page.waitForTimeout(500);
    const grid = this.page.locator(".ReactVirtualized__Grid");
    const resultInput1 = grid.locator(`.MuiBox-root:has-text("${firstCode}")`)
    await expect(resultInput1.first()).toBeVisible();
    await this.selectCheckbox();

    await this.searchRiskCode.fill('');
    await this.page.waitForTimeout(500);

    await this.searchRiskCode.fill(secondCode);
    // Log ทั้ง index และ text เต็ม
    console.log(`Risk Code = ${this.riskcodeCategories[secondIndex]}, index=${secondIndex}`);
    await this.page.waitForTimeout(500);
    const resultInput2 = grid.locator(`.MuiBox-root:has-text("${secondCode}")`)
    await expect(resultInput2.first()).toBeVisible();
    await this.selectCheckbox();


    await this.nextPage();
  }

  // ✅ Scroll helper สำหรับ ReactVirtualized list
  //เป็นตัวช่วยให้สามารถเลื่อนภายใน Box เพื่อไปตรวจสอบข้อมูลที่อยู่ด้านใน
  async scrollAndFindText(text: string) {
    const grid = this.page.locator(".ReactVirtualized__Grid");
    let found = false;

    for (let i = 0; i < 100; i++) { // scroll สูงสุด 60 รอบ
      const element = grid.getByText(text, { exact: true });

      // ตรวจว่ามีใน DOM หรือยัง (React Virtualized จะ render เมื่อ scroll ถึง)
      if (await element.count() > 0) {

        // เลื่อน element ให้โผล่มาใน view ของ container
        await element.first().scrollIntoViewIfNeeded();
        await expect(element.first()).toBeVisible();

        console.log(`✅ พบ "${text}" ที่ตำแหน่ง iteration=${i}`);
        found = true;
        break;
      }
      // scroll container ลงทีละ 300px
      await grid.evaluate(el => { el.scrollTop += 300 });
      await this.page.waitForTimeout(200);
    }

    if (!found) {
      // ถ้าไม่พบหมวดหมู่จะแสดง error ที่ชัดเจน
      throw new Error(`ไม่พบข้อความ "${text}" ใน Virtualized List หลังจาก scroll`);
    }
  }

  //ตรวจสอบ Risk Code
  async validateRiskCode() {
    await expect(this.page.getByText('เลือกหมวดหมู่สำหรับประกันอัคคีภัย')).toBeVisible();
    for (const category of this.categories) {
      await this.scrollAndFindText(category);
    }
  }
}
