import { Page, Locator, test } from "@playwright/test";

export class MSLoginLogoutPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly nextButton: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly yesButton: Locator;
  readonly iconButton: Locator;
  readonly logoutButton: Locator;
  readonly logoutConfirmButton: Locator;
  readonly signOutMSButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", {
      name: "Enter your email, phone, or",
    });
    this.nextButton = page.getByRole("button", { name: "Next" });
    this.passwordInput = page.getByRole("textbox", {
      name: "Enter the password for isp.",
    });
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.yesButton = page.getByRole("button", { name: "Yes" });
    this.iconButton = page.locator('[data-testid="AccountCircleIcon"]');
    this.logoutButton = page.getByRole("menuitem", { name: "ออกจากระบบ" });
    this.logoutConfirmButton = page.getByRole("button", { name: "ออกจากระบบ" });
    this.signOutMSButton = page.getByRole("button").first();
  }

  /**
   * Performs login to Microsoft account
   * @param email - Email address for login
   * @param password - Password for login
   */
  async login(email: string, password: string) {
    // Enter email
    await this.emailInput.fill(email);
    await this.nextButton.click();

    // Enter password
    await this.passwordInput.fill(password);
    await this.signInButton.click();

    // Confirm sign in (Stay signed in prompt)
    await this.yesButton.click();
  }
  async logout(email: string, password: string) {
    // Enter email
    await this.emailInput.fill(email);
    await this.nextButton.click();

    // Enter password
    await this.passwordInput.fill(password);
    await this.signInButton.click();

    // Confirm sign in (Stay signed in prompt)
    await this.yesButton.click();

    // Click account icon to logout step
    await this.iconButton.click();
    await this.logoutButton.click();
    await this.logoutConfirmButton.click();
    await this.signOutMSButton.click();
  }

  async loginEmailOnly(email: string) {
    // Enter email
    await this.emailInput.fill(email);
    await this.nextButton.click();
  }
  async loginInvalidPassword(email: string, password: string) {
    // Enter email
    await this.emailInput.fill(email);
    await this.nextButton.click();

    // Enter password
    await this.passwordInput.fill(password);
    await this.signInButton.click();

  }
}
