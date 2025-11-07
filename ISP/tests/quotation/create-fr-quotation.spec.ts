import { test, expect } from "../../fixtures/default-fixture";

test.describe('ระบบสามารถสร้างใบเสนอราคาได้', () => {
  test('ระบบต้องแสดงเมนูย่อยภายใต้เมนูใบเสนอราคาได้', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
  }) => {
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.hoverFRQuotationFromNavBar();
  });

  test('ระบบต้องแสดงฟีเจอร์ภายใต้เมนูใบเสนอราคาได้', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
  }) => {
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
  });

  test('ระบบต้อง redirect user กลับไปยังหน้าจอหลัก', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
  }) => {
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await homePage.redirectToMainMenu();
    await expect(page.getByText("ทิพยเคียงคู่คุณมาอย่างยาวนานและมั่นคงด้วยประสบการณ์กว่า 70 ปี")).toBeVisible();
  });

  test('ผู้ใช้สามารถเข้าสู่หน้าจอเลือก Class ของประกันได้', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
  }) => {
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    //ตรวจสอบว่าหน้าเมนูหลักแสดงผลครบตาม Test Case ไหม
    await quotationPage.validationQuotationMenuVisible();
  });

  test('ผู้ใช้สามารถสร้างใบเสนอราคาของ Class ประกันอัคคีภัย (FR) ได้จากหน้าจอหลักของระบบ', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
  }) => {
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
    await expect(page.getByRole('heading', { name: 'เลือกกลุ่มประกันภัยย่อยประกันอัคคีภัย (Sub Class)' })).toBeVisible();
  });

  test('ผู้ใช้สามารถสร้างใบเสนอราคาของ Class ประกันอัคคีภัย (FR) ได้จาก Navigation bar ของระบบ', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
  }) => {
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromNavBar();
    await expect(page.getByRole('heading', { name: 'เลือกกลุ่มประกันภัยย่อยประกันอัคคีภัย (Sub Class)' })).toBeVisible();
  });

  test('ผู้ใช้งานสามารถกดย้อนกลับไปที่หน้าเลือกเมนูใบเสนอราคาได้', async ({
    page,
    configuration,
    msLoginLogoutPage,
    homePage,
    quotationPage,
  }) => {
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
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
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
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
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
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
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
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
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
    await quotationSubClassPage.selectFireInsurance();
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
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
    await quotationSubClassPage.selectFireInsurance();
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
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
    await quotationSubClassPage.selectFireInsurance();
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
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
    await quotationSubClassPage.selectFireInsurance();
    await frCategoryPage.searchRiskCodeBy1Code();
    await frResponsiblePersonPage.nextPage();
    await frAssuredDetailsPage.fillForm();
    await frAssuredDetailsPage.nextPage();
    await page.waitForTimeout(1000);
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
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
    await quotationSubClassPage.selectFireInsurance();
    await frCategoryPage.searchRiskCodeBy1Code();
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
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
    await quotationSubClassPage.selectFireInsurance();
    await frCategoryPage.searchRiskCodeBy1Code();
    await frResponsiblePersonPage.nextPage();
    await frAssuredDetailsPage.validateNuturalPersonType();
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
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
    await quotationSubClassPage.selectFireInsurance();
    await frCategoryPage.searchRiskCodeBy1Code();
    await frResponsiblePersonPage.nextPage();
    await frAssuredDetailsPage.fillJustNameTitleForNuturalPerson();
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
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
    await quotationSubClassPage.selectFireInsurance();
    await frCategoryPage.searchRiskCodeBy1Code();
    await frResponsiblePersonPage.nextPage();
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
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
    await quotationSubClassPage.selectFireInsurance();
    await frCategoryPage.searchRiskCodeBy1Code();
    await frResponsiblePersonPage.nextPage();
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
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
    await quotationSubClassPage.selectFireInsurance();
    await frCategoryPage.searchRiskCodeBy1Code();
    await frResponsiblePersonPage.nextPage();
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
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
    await quotationSubClassPage.selectFireInsurance();
    await frCategoryPage.searchRiskCodeBy1Code();
    await frResponsiblePersonPage.nextPage();
    await frAssuredDetailsPage.validatePhoneNumber();
  });

  test.only('Search หาข้อมูลที่อยู่ได้ตาม Keyword ที่ต้องการ และเลือกข้อมูลที่อยู่ตามตัวกรองได้ตั้งแต่จังหวัด เขต แขวง และรหัสไปรษณีย์', async ({
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
    await page.goto(configuration.appSettings.BASE_URL);
    await msLoginLogoutPage.login(
        configuration.users.userAE.email,
        configuration.users.userAE.password
    );
    await homePage.accessQuotation();
    await quotationPage.createFRQuotationFromMainMenu();
    await quotationSubClassPage.selectFireInsurance();
    await frCategoryPage.searchRiskCodeBy1Code();
    await frResponsiblePersonPage.nextPage();
    await frAssuredDetailsPage.addressSearchByKeyword();
  });
});