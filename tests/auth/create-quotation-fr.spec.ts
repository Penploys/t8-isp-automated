import { test, expect } from "../../fixtures/default-fixture";

test.describe('ระบบสามารถสร้างใบเสนอราคาได้', () => {
  test('ระบบต้องแสดงเมนูย่อยภายใต้เมนูใบเสนอราคาได้', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // นำเมาส์ไปวางที่เมนูใบเสนอราคาบน navigate bar แล้วตรวจสอบหัวข้อย่อยในนั้น
    await quotationPage.hoverFRQuotationFromNavBar();
  });

  test('ระบบต้องแสดงฟีเจอร์ภายใต้เมนูใบเสนอราคาได้ และผู้ใช้สามารถเข้าสู่หน้าจอเลือก Class ของประกันได้', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    //ตรวจสอบว่าหน้าเมนูหลักแสดงผลครบตาม Test Case ไหม
    await quotationPage.validationQuotationMenuVisible();
  });

  test('ระบบต้อง redirect user กลับไปยังหน้าจอหลัก', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // กลับไปที่หน้าหลัก
    await homePage.redirectToMainMenu();
    // ตรวจสอบว่ากลับมาที่หน้าหลักสำเร็จผ่านข้อความ
    await expect(page.getByText("ทิพยเคียงคู่คุณมาอย่างยาวนานและมั่นคงด้วยประสบการณ์กว่า 70 ปี")).toBeVisible();
  });

  test('ผู้ใช้สามารถสร้างใบเสนอราคาของ Class ประกันอัคคีภัย (FR) ได้จากหน้าจอหลักของระบบ', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // ตรวจสอบว่าหน้าจอเลือก Sub-Class จากหัวข้อว่าแสดงผลถูกต้อง
    await expect(page.getByRole('heading', { name: 'เลือกกลุ่มประกันภัยย่อยประกันอัคคีภัย (Sub Class)' })).toBeVisible();
  });

  test('ผู้ใช้สามารถสร้างใบเสนอราคาของ Class ประกันอัคคีภัย (FR) ได้จาก Navigation bar ของระบบ', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูใบเสนอราคาใน navigation bar
    await quotationPage.createFRQuotationFromNavBar();
    // ตรวจสอบว่าหน้าจอเลือก Sub-Class จากหัวข้อว่าแสดงผลถูกต้อง
    await expect(page.getByRole('heading', { name: 'เลือกกลุ่มประกันภัยย่อยประกันอัคคีภัย (Sub Class)' })).toBeVisible();
  });

  test('ผู้ใช้งานสามารถกดย้อนกลับไปที่หน้าเลือกเมนูใบเสนอราคาได้', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // ย้อนกลับไปที่หน้าเมนูหลักใบเสนอราคา
    await homePage.backToPreviousPage();
    //ตรวจสอบว่าหน้าเมนูหลักแสดงผลครบตาม Test Case ไหม
    await quotationPage.validationQuotationMenuVisible();
  });

  test('ผู้ใช้สามารถเลือก Sub-Class FR ได้', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
  });

  test('ผู้ใช้ไม่สามารถเลือก Sub-Class CL ได้', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // ตรวจสอบว่าไม่สามารถเลือก Sub-Class CL ได้
    await quotationSubClassPage.validateCLDisabled();
  });

  test('ระบบสามารถแสดงหน้าจอเลือก Risk Code ของ Sub-Class FR ได้ โดยแบ่งตาม Category และประเภทยอดนิยม', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    //ตรวจสอบหมวดหมู่ของ Risk Code ต่างๆ
    await frCategoryPage.validateRiskCode();
  });

  test('ผู้ใช้งานสามารถค้นหา Risk Code ได้จากทั้งชื่อและรหัส', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // ค้นหา Risk Code จากชื่อหรือรหัส
    await frCategoryPage.searchRiskCodeByNameOrCode();
  });

  test('ผู้ใช้งานสามารถทำการเลือก Risk Code โดยการกดเลือกได้ 1 Risk Code', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // เลือก Risk Code จากรหัส 1 รายการ
    await frCategoryPage.searchRiskCodeBy1Code();
  });

  test('ผู้ใช้งานสามารถทำการเลือก Risk Code ได้มากกว่า 1 Risk Code', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // เลือก Risk Code จากรหัส 2 รายการ
    await frCategoryPage.searchRiskCodeBy2Codes();
  });

  test('User เลือก Single Risk Code ประเภท House', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
    frResponsiblePersonPage,
    frAssuredDetailsPage,
    frCoverageDetailsPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // เลือก Risk Code ประเภท House 1 รายการ
    await frCategoryPage.searchRiskCodeBy1Code();
    // กดปุ่ม "ถัดไป" ในหน้าผู้รับผิดชอบ
    await frResponsiblePersonPage.nextPage();
    // กรอกข้อมูลผู้เอาประกันภัยแบบบุคคลและข้อมูลที่อยู่ผู้เอาประกันภัย แล้วไปหน้ารายละเอียดความคุ้มครอง
    await frAssuredDetailsPage.fillNaturalPersonForm();
    await frAssuredDetailsPage.fillAddressForm();
    await frAssuredDetailsPage.nextPage();
    // ตรวจสอบว่าหน้ารายละเอียดความคุ้มครองแสดงฟอร์มของประเภท House
    await frCoverageDetailsPage.validateHouseForm();
  });

  test('ผู้ใช้งานสามารถกดย้อนกลับมาที่หน้าเลือก Risk Code เพื่อทำการเลือก Risk Code ใหม่ได้', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // เลือก Risk Code จากรหัส 1 รายการ
    await frCategoryPage.searchRiskCodeBy1Code();
    // ย้อนกลับไปที่หน้าเลือก Risk Code และตรวจสอบว่า Checkbox ที่เลือกไว้ยังคงถูกเลือกอยู่
    await frCategoryPage.backPageAndValidateCheckedBox();
  });

  test('การระบุข้อมูลผู้เอาประกันภัยแบบบุคคล', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
    frResponsiblePersonPage,
    frAssuredDetailsPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // เลือก Risk Code จากรหัส 1 รายการ
    await frCategoryPage.searchRiskCodeBy1Code();
    // กดปุ่ม "ถัดไป" ในหน้าผู้รับผิดชอบ
    await frResponsiblePersonPage.nextPage();
    // ตรวจสอบการแสดงผลของชื่อและนามสกุล เมื่อเลือกคำนำหน้าเป็นแบบรายบุคคล
    await frAssuredDetailsPage.validateNaturalPersonType();
  });

  test('การ Validate Required Field ของข้อมูลผู้เอาประกันภัยแบบบุคคล', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
    frResponsiblePersonPage,
    frAssuredDetailsPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // เลือก Risk Code จากรหัส 1 รายการ
    await frCategoryPage.searchRiskCodeBy1Code();
    // กดปุ่ม "ถัดไป" ในหน้าผู้รับผิดชอบ
    await frResponsiblePersonPage.nextPage();
    // ใส่คำนำหน้าชื่อเป็นแบบรายบุคคล และตรวจสอบช่องระบุชื่อและนามสกุลหากไม่ใส่ข้อมูลลงไป
    await frAssuredDetailsPage.fillJustNameTitleForNaturalPerson();
  });

  test('การระบุข้อมูลผู้เอาประกันภัยแบบนิติบุคคล', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
    frResponsiblePersonPage,
    frAssuredDetailsPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // เลือก Risk Code จากรหัส 1 รายการ
    await frCategoryPage.searchRiskCodeBy1Code();
    // กดปุ่ม "ถัดไป" ในหน้าผู้รับผิดชอบ
    await frResponsiblePersonPage.nextPage();
    // ตรวจสอบการแสดงผลของชื่อและนามสกุล เมื่อเลือกคำนำหน้าเป็นแบบนิติบุคคล
    await frAssuredDetailsPage.validateJuristicPersonType();
  });

  test('การ Validate Required Field ของข้อมูลผู้เอาประกันภัยแบบนิติบุคคล', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
    frResponsiblePersonPage,
    frAssuredDetailsPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // เลือก Risk Code จากรหัส 1 รายการ
    await frCategoryPage.searchRiskCodeBy1Code();
    // กดปุ่ม "ถัดไป" ในหน้าผู้รับผิดชอบ
    await frResponsiblePersonPage.nextPage();
    // ใส่คำนำหน้าชื่อเป็นแบบนิติบุคคล และตรวจสอบช่องระบุชื่อและประเภทนิติบุคคลหากไม่ใส่ข้อมูลลงไป
    await frAssuredDetailsPage.fillJustNameTitleForJuristicPerson();
  });

  test('การ Validate ข้อมุลใน field: อีเมล', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
    frResponsiblePersonPage,
    frAssuredDetailsPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // เลือก Risk Code จากรหัส 1 รายการ
    await frCategoryPage.searchRiskCodeBy1Code();
    // กดปุ่ม "ถัดไป" ในหน้าผู้รับผิดชอบ
    await frResponsiblePersonPage.nextPage();
    // ใส่อีเมลที่ไม่ถูก Format เพื่อตรวจสอบการ Validate
    await frAssuredDetailsPage.validateInvalidEmail();
  });

  test('การ Validate ข้อมุลใน field: เบอร์โทรศัพท์', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
    frResponsiblePersonPage,
    frAssuredDetailsPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // เลือก Risk Code จากรหัส 1 รายการ
    await frCategoryPage.searchRiskCodeBy1Code();
    // กดปุ่ม "ถัดไป" ในหน้าผู้รับผิดชอบ
    await frResponsiblePersonPage.nextPage();
    // ใส่เบอร์โทรศัพท์ที่ไม่ถูก Format เพื่อตรวจสอบการ Validate
    await frAssuredDetailsPage.validatePhoneNumber();
  });

  test('Search หาข้อมูลที่อยู่ได้ตาม Keyword ที่ต้องการ และเลือกข้อมูลที่อยู่ตามตัวกรองได้ตั้งแต่จังหวัด เขต แขวง และรหัสไปรษณีย์', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
    frResponsiblePersonPage,
    frAssuredDetailsPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // เลือก Risk Code จากรหัส 1 รายการ
    await frCategoryPage.searchRiskCodeBy1Code();
    // กดปุ่ม "ถัดไป" ในหน้าผู้รับผิดชอบ
    await frResponsiblePersonPage.nextPage();
    // ค้นหาข้อมูลที่อยู่ตาม Keyword ที่ต้องการและเลือกข้อมูลที่อยู่ตามตัวกรอง
    await frAssuredDetailsPage.addressSearchByKeyword();
  });

  test('ในการกรอกข้อมูลที่อยู่ครั้งแรก สามารถกรอกข้อมูลที่อยู่ทั้งหมดได้ และหากยังไม่มีข้อมูลสถานที่ตั้งหรือเก็บทรัพย์สินเอาประกันภัย สามารถเลือกข้อมูลที่อยู่นี้แล้วนำไปใช้เป็นข้อมูลที่อยู่ของสถานที่ตั้งหรือเก็บทรัพย์สินเอาประกันภัย', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
    frResponsiblePersonPage,
    frAssuredDetailsPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // เลือก Risk Code จากรหัส 1 รายการ
    await frCategoryPage.searchRiskCodeBy1Code();
    // กดปุ่ม "ถัดไป" ในหน้าผู้รับผิดชอบ
    await frResponsiblePersonPage.nextPage();
    // กรอกข้อมูลผู้เอาประกันภัยแบบบุคคลและข้อมูลที่อยู่ผู้เอาประกันภัย
    await frAssuredDetailsPage.fillNaturalPersonForm();
    await frAssuredDetailsPage.fillAddressForm();
    // ตรวจสอบว่าข้อมูลที่อยู่ของผู้เอาประกันภัย ถูกนำไปใช้เป็นข้อมูลที่อยู่ของสถานที่ตั้งหรือเก็บทรัพย์สินเอาประกันภัย
    await expect(page.getByText('เลขที่ 123/45, หมู่บ้านทดสอบ, หมู่ 2, ซอย ทดสอบซอย, ถนน ทดสอบถนน, ตำบล/แขวง คลองตัน, อำเภอ/เขต คลองเตย, จังหวัด กรุงเทพมหานคร, 10110').nth(1)).toBeVisible();
  });

  test('สามารถแก้ไขที่อยู่ผู้เอาประกันภัยได้ โดยมีข้อมูลเดิม default ขึ้นมาให้แก้ไข', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
    frResponsiblePersonPage,
    frAssuredDetailsPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // เลือก Risk Code จากรหัส 1 รายการ
    await frCategoryPage.searchRiskCodeBy1Code();
    // กดปุ่ม "ถัดไป" ในหน้าผู้รับผิดชอบ
    await frResponsiblePersonPage.nextPage();
    // กรอกข้อมูลผู้เอาประกันภัยแบบบุคคลและข้อมูลที่อยู่ผู้เอาประกันภัย
    await frAssuredDetailsPage.fillNaturalPersonForm();
    await frAssuredDetailsPage.fillAddressForm();
    // แก้ไขที่อยู่ผู้เอาประกันภัย
    await frAssuredDetailsPage.editInsuredAddress();
  });

  test('สามารถแก้ไขที่อยู่ของสถานที่ตั้งหรือเก็บทรัพย์สินเอาประกันภัย โดยมีข้อมูลเดิม default ขึ้นมาให้แก้ไข', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
    frResponsiblePersonPage,
    frAssuredDetailsPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // เลือก Risk Code จากรหัส 1 รายการ
    await frCategoryPage.searchRiskCodeBy1Code();
    // กดปุ่ม "ถัดไป" ในหน้าผู้รับผิดชอบ
    await frResponsiblePersonPage.nextPage();
    // กรอกข้อมูลผู้เอาประกันภัยแบบบุคคลและข้อมูลที่อยู่ผู้เอาประกันภัย
    await frAssuredDetailsPage.fillNaturalPersonForm();
    await frAssuredDetailsPage.fillAddressForm();
    // แก้ไขที่อยู่ของสถานที่ตั้งหรือเก็บทรัพย์สินเอาประกันภัย
    await frAssuredDetailsPage.editInsuredLocation();
  });

  test('สามารถลบที่อยู่ผู้เอาประกันภัยได้', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
    quotationSubClassPage,
    frCategoryPage,
    frResponsiblePersonPage,
    frAssuredDetailsPage,
  }) => {
    // เข้าสู่ระบบด้วย AE User
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    // ไปที่หน้าใบเสนอราคา
    await homePage.accessQuotation();
    // สร้างใบเสนอราคา FR จากเมนูหลัก
    await quotationPage.createFRQuotationFromMainMenu();
    // เลือก Sub-Class FR
    await quotationSubClassPage.selectFireInsurance();
    // เลือก Risk Code จากรหัส 1 รายการ
    await frCategoryPage.searchRiskCodeBy1Code();
    // กดปุ่ม "ถัดไป" ในหน้าผู้รับผิดชอบ
    await frResponsiblePersonPage.nextPage();
    // กรอกข้อมูลผู้เอาประกันภัยแบบบุคคลและข้อมูลที่อยู่ผู้เอาประกันภัย
    await frAssuredDetailsPage.fillNaturalPersonForm();
    await frAssuredDetailsPage.fillAddressForm();
    // ลบที่อยู่ผู้เอาประกันภัย (เนื่องจากหน้าเว็บไม่ได้กำหนด id หรือชื่อเฉพาะของปุ่มถังขยะ จึงใช้วิธีลบที่อยู่รายการแรก)
    await frAssuredDetailsPage.deleteAddress(0);
  });
});