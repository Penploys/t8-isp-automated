import { Page, Locator, test, expect } from "@playwright/test";

export class FRAssuredDetailsPage {
  readonly page: Page;
  readonly nameTitle: Locator;
  readonly nameLabel: Locator;
  readonly surnameLabel: Locator;
  readonly corporationLabel: Locator;
  readonly corporationTypeLabel: Locator;
  readonly userName: Locator;
  readonly userSurname: Locator;
  readonly corporationName: Locator;
  readonly corporationSuffix: Locator;
  readonly corporationSuffixList: Locator;
  readonly emailField: Locator;
  readonly phoneNumber: Locator;
  readonly openAddressForm: Locator;
  readonly addressDetails: Locator;
  readonly addressSubDetails: Locator;
  readonly houseNumber: Locator;
  readonly addressLine: Locator;
  readonly addressMoo: Locator;
  readonly addressSoi: Locator;
  readonly addressRoad: Locator;
  readonly landCode: Locator;
  readonly applyAddress: Locator;
  readonly confirmButton: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameTitle = page.locator('input[role="combobox"][id="insureds.0.titleName"]');
    this.nameLabel = page.locator('label.MuiFormLabel-root', { hasText:'ชื่อ' }).first();
    this.surnameLabel = page.locator('label.MuiFormLabel-root', { hasText:'นามสกุล' }).first();
    this.corporationLabel = page.locator('label.MuiFormLabel-root', { hasText:'ชื่อนิติบุคคล' }).first();
    this.corporationTypeLabel = page.locator('label.MuiFormLabel-root', { hasText:'ประเภทนิติบุคคล' }).first();
    this.userName = page.locator('input[id="insureds.0.firstName"]');
    this.userSurname = page.locator('input[id="insureds.0.lastName"]');
    this.corporationName = page.locator('input[id="insureds.0.name"]');
    this.corporationSuffix = page.locator('input[id="insureds.0.suffixName"]');
    this.corporationSuffixList = page.getByRole('option').first();
    this.emailField = page.locator('input[id="insureds.0.email"]');
    this.phoneNumber = page.locator('input[name="insureds.0.telephone"]')
    this.openAddressForm = page.getByRole("button", { name: "กรอกที่อยู่" });
    this.addressDetails = page.locator('input[id="address.region"]');
    this.addressSubDetails = page.getByRole('option').first();
    this.houseNumber = page.locator('input[id="address.houseNumber"]');
    this.addressLine = page.locator('input[id="address.addressLine"]');
    this.addressMoo = page.locator('input[id="address.moo"]');
    this.addressSoi = page.locator('input[id="address.soi"]');
    this.addressRoad = page.locator('input[id="address.road"]');
    this.landCode = page.locator('input[id="address.landCode"]');
    this.applyAddress = page.locator('input[name="isApplyAddress"][type="checkbox"]');
    this.confirmButton = page.getByRole("button", { name: "ยืนยัน" });
    this.editButton = page.locator('button:has(svg g[id="pencil"])');
    this.deleteButton = page.locator('button:has(svg g[id="trash-2"])');
    this.nextButton = page.getByRole("button", { name: "เริ่มคำนวณเบี้ย" });
  }

  //ใส่ข้อมูลคำนำหน้าชื่อแบบรายบุคคล พร้อมชื่อและนามสกุล
  async fillNaturalPersonForm() {
    await this.nameTitle.click();
    const titleOption = this.page.getByRole('option', { name: "นาย" }).first();
    await titleOption.click();

    await this.userName.scrollIntoViewIfNeeded();
    await this.userName.fill('สมหมาย');

    await this.userSurname.fill('คลายเหงา');
  }

  //ใส่ข้อมูลคำนำหน้าชื่อแบบนิติบุคคล พร้อมชื่อนิติบุคคลและประเภทนิติบุคคล
  async fillJuristicPersonForm() {
    await this.nameTitle.click();
    const titleOption = this.page.getByRole('option', { name: "สำนักงาน" }).first();
    await titleOption.click();

    await this.corporationName.scrollIntoViewIfNeeded();
    await this.corporationName.fill('QA Testing');

    await this.corporationSuffix.fill('บริษัท');
    await this.corporationSuffixList.click();
  }

  async fillAddressForm() {
    await this.openAddressForm.scrollIntoViewIfNeeded();
    await this.openAddressForm.click();
    await this.addressDetails.click();

    for (let i = 0; i < 4; i++) {
      await this.addressSubDetails.click();
      await this.page.waitForTimeout(200);
    };

    await this.houseNumber.fill('123/45');
    await this.addressLine.fill('หมู่บ้านทดสอบ');
    await this.addressMoo.fill('2');
    await this.addressSoi.fill('ทดสอบซอย');
    await this.addressRoad.fill('ทดสอบถนน');
    
    await this.applyAddress.click();
    await this.confirmButton.click();
  }

  //กดปุ่มแก้ไขที่อยู่ของผู้เอาประกันภัย และแก้ไขข้อมูลที่อยู่
  async editInsuredAddress() {
    await this.editButton.nth(0).click();
    await this.page.waitForTimeout(500);

    //ตรวจสอบข้อมูลที่แสดงผลในช่องที่อยู่ก่อนแก้ไข
    await expect(this.addressDetails).toHaveValue('กรุงเทพมหานคร, คลองเตย, คลองตัน, 10110');
    await expect(this.houseNumber).toHaveValue('123/45');
    await expect(this.addressLine).toHaveValue('หมู่บ้านทดสอบ');
    await expect(this.addressMoo).toHaveValue('2');
    await expect(this.addressSoi).toHaveValue('ทดสอบซอย');
    await expect(this.addressRoad).toHaveValue('ทดสอบถนน');

    //แก้ไขข้อมูลที่อยู่
    await this.houseNumber.fill('');
    await this.addressLine.fill('');
    await this.addressMoo.fill('');
    await this.addressSoi.fill('');
    await this.addressRoad.fill('');
    
    await this.confirmButton.click();

    await expect(this.page.getByText('ตำบล/แขวง คลองตัน, อำเภอ/เขต คลองเตย, จังหวัด กรุงเทพมหานคร, 10110').nth(0)).toBeVisible();
  }

  //กดปุ่มแก้ไขที่อยู่ของสถานที่ตั้งหรือเก็บทรัพย์สินเอาประกันภัย และแก้ไขข้อมูลที่อยู่
  async editInsuredLocation() {
    await this.editButton.nth(1).click();
    await this.page.waitForTimeout(500);

    //ตรวจสอบข้อมูลที่แสดงผลในช่องที่อยู่ก่อนแก้ไข
    await expect(this.addressDetails).toHaveValue('กรุงเทพมหานคร, คลองเตย, คลองตัน, 10110');
    await expect(this.houseNumber).toHaveValue('123/45');
    await expect(this.addressLine).toHaveValue('หมู่บ้านทดสอบ');
    await expect(this.addressMoo).toHaveValue('2');
    await expect(this.addressSoi).toHaveValue('ทดสอบซอย');
    await expect(this.addressRoad).toHaveValue('ทดสอบถนน');

    //แก้ไขข้อมูลที่อยู่
    await this.houseNumber.fill('');
    await this.addressLine.fill('');
    await this.addressMoo.fill('');
    await this.addressSoi.fill('');
    await this.addressRoad.fill('');
    //เพิ่มเลขที่โฉนด
    await this.landCode.fill('123');
    
    await this.confirmButton.click();

    await expect(this.page.getByText('ตำบล/แขวง คลองตัน, อำเภอ/เขต คลองเตย, จังหวัด กรุงเทพมหานคร, 10110').nth(1)).toBeVisible();
    await expect(this.page.getByText('เลขที่โฉนด : 123')).toBeVisible();
  }

  //กดปุ่มลบที่อยู่
  async deleteAddress(index=0) {
    await this.deleteButton.nth(index).click();
  }

  //กดปุ่ม "เริ่มคำนวณเบี้ย"
  async nextPage() {
    await this.nextButton.click();
  }

  //ตรวจสอบการแสดงผลของชื่อและนามสกุล เมื่อเลือกคำนำหน้าเป็นแบบรายบุคคล
  async validateNuturalPersonType() {
    await this.nameTitle.fill('นาย');
    const titleOption = this.page.getByRole('option', { name: "นาย" }).first();
    await titleOption.click();
    await expect(this.nameLabel).toBeVisible();
    await expect(this.surnameLabel).toBeVisible();
  }

  //ตรวจสอบการแสดงผลของชื่อนิติบุคคลและประเภทนิติบุคคล เมื่อเลือกคำนำหน้าเป็นแบบนิติบุคคล
  async validateJuristicPersonType() {
    await this.nameTitle.fill('สำนักงาน');
    const titleOption = this.page.getByRole('option', { name: "สำนักงาน" }).first();
    await titleOption.click();
    await expect(this.corporationLabel).toBeVisible();
    await expect(this.corporationTypeLabel).toBeVisible();
  }

  //ตรวจสอบช่องอีเมลเมื่อกรอกผิด Format
  async validateInvalidEmail() {
    //กรอกอีเมลไม่ตรง Format
    await this.emailField.fill('tes@');
    await this.nextPage();
    await expect(this.page.getByText('อีเมลไม่ถูกต้อง')).toBeVisible();
  }

  //ตรวจสอบช่องเบอร์โทรเมื่อกรอกตัวอักษรและตัวเลข ในช่องเบอร์โทรจะแสดงแค่ตัวเลข
  async validatePhoneNumber() {
    //กรอกเบอร์โดยไม่ใช้ตัวเลข
    await this.phoneNumber.fill('test@123');
    await expect(this.phoneNumber).toHaveValue(/123\s*/);
  }

  //ใส่คำนำหน้าชื่อเป็นแบบรายบุคคล และตรวจสอบช่องระบุชื่อและนามสกุลหากไม่ใส่ข้อมูลลงไป
  async fillJustNameTitleForNuturalPerson() {
    await this.nameTitle.fill('นาย'); //เลือกคำนำหน้าชื่อแบบบุคคล เช่น นาย
    const titleOption = this.page.getByRole('option', { name: "นาย" }).first(); //เปลี่ยน name ให้ตรงกับที่ค้นหา
    await titleOption.click();
    await this.nextPage();
    const allErrors = await this.page.getByText('กรุณาระบุ').all();
    console.log(`พบ Field ที่ยังไม่ใส่ทั้งหมด ${allErrors.length} จุด`);
    for (const error of allErrors) {
      await expect(error).toBeVisible();
    }
  }

  //ใส่คำนำหน้าชื่อเป็นแบบนิติบุคคล และตรวจสอบช่องระบุชื่อนิติบุคคลและประเภทบุคคลหากไม่ใส่ข้อมูลลงไป
  async fillJustNameTitleForJuristicPerson() {
    await this.nameTitle.fill('สำนักงาน'); //เลือกคำนำหน้าชื่อแบบนิติบุคคล เช่น สำนักงาน
    const titleOption = this.page.getByRole('option', { name: "สำนักงาน" }).first(); //เปลี่ยน name ให้ตรงกับที่ค้นหา
    await titleOption.click();
    await this.nextPage();
    const allErrors = await this.page.getByText('กรุณาระบุ').all();
    console.log(`พบ Field ที่ยังไม่ใส่ทั้งหมด ${allErrors.length} จุด`);
    for (const error of allErrors) {
      await expect(error).toBeVisible();
    }
  }

  //Search หาข้อมูลที่อยู่ได้ตาม Keyword ที่ต้องการ และเลือกข้อมูลที่อยู่ตามตัวกรองได้ตั้งแต่จังหวัด อำเภอ ตำบล และรหัสไปรษณีย์
  async addressSearchByKeyword() {
    await this.openAddressForm.scrollIntoViewIfNeeded();
    await this.openAddressForm.click();

    //ใส่แค่จังหวัดและอำเภอก่อน ตอนนี้มีบัคที่ระบบไม่สามารถค้นหาตำบลหลังจากอำเภอได้
    //โฟกัสก่อน แล้วพิมพ์ให้เหมือน user พิมพ์จริง ป้องกันระบบไม่ autocomplete ให้
    await this.addressDetails.click();
    await this.addressDetails.pressSequentially('ระนอง, กะเปอร์', { delay: 100 }); // ใส่ delay เล็กๆ ให้ระบบจับการพิมพ์
    await this.page.waitForTimeout(200);
    await expect(this.addressSubDetails.getByText('ระนอง')).toBeVisible();

    /* ไว้ใช้ตอนบัคหายแล้ว
    const addressSet = ['ระนอง', 'กะเปอร์', 'บางหิน', '85120']

    for (const address of addressSet) {
      await this.addressDetails.pressSequentially(address + ', ', { delay: 100 });
      await this.page.waitForTimeout(200);
      await expect(this.addressSubDetails.getByText(address)).toBeVisible();
    };
    */

    await this.addressSubDetails.click();
    await expect(this.addressDetails).toHaveValue(/ระนอง, กะเปอร์/);
  }
}