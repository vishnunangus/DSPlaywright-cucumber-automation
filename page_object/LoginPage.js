const {expect} = require('playwright/test')

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernamefield = page.locator("input[name='username']");
        this.passwordfield = page.locator("input[name='password']");
        this.submit_btn = page.getByText('Log In');
        this.launch_btn = page.locator('a[href="https://testing.agency.e-dot.com"]');
        this.logout_btn = page.locator('svg[data-testid="SignOutIcon"]');

    }

    async login(username, password) {

        await this.usernamefield.type(username);
        await this.passwordfield.type(password);


    }

    async clickLogin() {
        await this.submit_btn.click();
    }

    async launchApp() {
        await this.launch_btn.click();
    }

    async Validation()
    {
        await expect(this.page).toHaveURL(/.*projects-management\/list/, { timeout: 60000 });
    }

    async logout()
    {
        await this.page.waitForSelector('div[data-testid="backdropLoadingTestId"]', { state: 'hidden', timeout: 120000 });
        await this.logout_btn.click();
    }

    async validate_logout_sucess()

    {
        await expect(this.page).toHaveURL("https://testing.app.e-dot.com/auth/login", { timeout: 120000 });
    }
}

module.exports = { LoginPage };
