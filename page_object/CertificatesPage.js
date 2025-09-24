
const { expect } = require('playwright/test');



class CertificatesPage {
    /**
  * @param {import('@playwright/test').Page} page
  */
    constructor(page) {
        /** @type {import('@playwright/test').Page} */

        this.page = page;
        this.certificatebtn = page.getByText("Certificate Types");
        this.addIconbtn = page.locator("svg[data-testid='AddIcon']");
        this.name_field = page.getByPlaceholder("Enter Certificate Type Name");
        this.description_field = page.locator("textarea[class='sc-hmBdrb cfEBUN']");
        this.submit_tbn = page.locator("div[class='sc-enBMOK jRFXRw'] button:nth-child(2)");
        this.delete_Btn = page.locator("ul[role='menu'] li:has-text('Delete')");
        this.confirmdelete = page.locator('button[data-testid="accessButtonTestId"]');
        this.certificateslist = page.locator("tr td:nth-child(1)");
        this.save_btn = page.getByText('Save');
        this.nux = page.getByText('Click here to add a certificate type');


    }

    async click_on_certificatetab() {
        await this.certificatebtn.click();

    }

    async click_on_addbtn() {
        await this.addIconbtn.click();
    }

    async Enter_certificate_name(certificateName) {
        await this.name_field.fill(certificateName);
    }


    async Enter_certificate_description(certificateDescription) {
        await this.description_field.fill(certificateDescription);
    }

    async click_on_submit() {
        await this.submit_tbn.click();
    }

    async validateSuccessMessage() {

        const snackbar = this.page.locator('div[aria-describedby="notistack-snackbar"]').first();
        await expect(snackbar).toHaveText('Certificate added successfully', { timeout: 10000 });
        await expect(snackbar).toBeVisible();
    }

    async clickhamberger(certificateName) {
        const hamberger_btn = this.page.locator(`tr:has(td[title="${certificateName}"]) td:nth-child(4) button`);
        await hamberger_btn.click();
    }

    async clickhambergeredit(certificateName) {
        const hamberger_btn = this.page.locator(`tr:has(td[title="${certificateName}"]) td:nth-child(4) button:has-text('Edit')`);
        await hamberger_btn.click();
    }


    async clickdeletebutton() {
        await this.delete_Btn.click();
    }

    async clickconfirmdeletebutton() {
        await this.confirmdelete.click();
    }

    async validateDeleteSuccessMessage() {
        const snackbar = this.page.locator('div[aria-describedby="notistack-snackbar"]').first();
        await expect(snackbar).toHaveText('Certificate type deleted successfully', { timeout: 10000 });
        await expect(snackbar).toBeVisible();
    }

    async waitForLoadingToComplete() {

        await this.page.waitForSelector('tr[data-testid="skeletonRow"]', { state: 'detached' });
    }

    async clickoneditbutton() {
        await this.page.locator('tr:has(td[title="Test Certificate_1758620850108"])').getByRole('button', { name: 'Edit' }).click();

    }

    async clickonsavebtn() {
        await this.save_btn.click();
    }

    async validateEditedSuccessMessage() {
        const snackbar = this.page.locator('div[aria-describedby="notistack-snackbar"]').first();
        await expect(snackbar).toHaveText('Certificate edited successfully', { timeout: 10000 });
        await expect(snackbar).toBeVisible();
    }

    async getCertificatesCount() {

        await this.page.getByRole('progressbar').waitFor({ state: 'hidden' });
        const countText = await this.page.locator("a[href='/admin/material-certificates/certificate-types'] span:nth-of-type(2)").innerText();
        return Number(countText.replace(/[() ]/g, ''));


    }

    async fetch_all_certificates() {
        return this.certificateslist.allTextContents();
    }

    async clickonnux()
    {
        await this.nux.click();
    }
}

module.exports = { CertificatesPage };