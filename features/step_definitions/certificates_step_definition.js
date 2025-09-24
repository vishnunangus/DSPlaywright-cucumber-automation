const { Given, When, Then, } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');
const { POManager } = require('../../page_object/POManager');
const { CertificatesPage } = require('../../page_object/CertificatesPage')


When('Click on certificates button', async function () {

    await this.certificatespage.click_on_certificatetab();

});


Then('I click on add button', async function () {

    await this.certificatespage.click_on_addbtn();

});

Then('I enter the certificate name as {string}', async function (certificateName) {

    const UniqueCertificateName = `${certificateName}_${Date.now()}`;
    this.uniquecertificatename = UniqueCertificateName;
    await this.certificatespage.Enter_certificate_name(UniqueCertificateName);

});

Then('I enter the description as {string}', async function (certificateDescription) {

    const UniqueCertificateDescription = `${certificateDescription}_${Date.now()}`;
    this.certificatedescription = UniqueCertificateDescription;
    await this.certificatespage.Enter_certificate_description(UniqueCertificateDescription);

});

Then('I click on submit button', async function () {

    await this.certificatespage.click_on_submit();

});


Then('Validate certificate creation message is fired successfully', async function () {

    await this.certificatespage.validateSuccessMessage();

});

Then('I validate created certificate is in the table', async function () {

    await this.certificatespage.waitForLoadingToComplete();

    await expect(this.page.getByText(this.uniquecertificatename)).toBeVisible();

});

Then('Click on Hamberger menu of the created certificate', async function () {

    await this.certificatespage.clickhamberger(this.uniquecertificatename);

});

When('I click on Delete button', async function () {

    await this.certificatespage.clickdeletebutton();

});

Then('I click on confirm delete button', async function () {

    await this.certificatespage.clickconfirmdeletebutton();

});

Then('Validate certificate deleted message if fired successfully', async function () {

    await this.certificatespage.validateDeleteSuccessMessage();

});

When('I click on edit button for the created certificate', async function () {

    await this.certificatespage.clickhambergeredit(this.uniquecertificatename);

});


Then('I edit the name as {string}', async function (suffix) {

    const EditedCertificateName = `${this.uniquecertificatename}${suffix}`;
    this.EditedCertificateName = EditedCertificateName;
    await this.certificatespage.Enter_certificate_name(EditedCertificateName);

});


Then('I edit the certifcate description as {string}', async function (suffixdesc) {

    const EditedCertificateDescription = `${this.uniquecertificatename}${suffixdesc}`;
    this.EditedCertificateDescription = EditedCertificateDescription;
    await this.certificatespage.Enter_certificate_description(EditedCertificateDescription);


});


Then('I click on save button', function () {

    this.certificatespage.clickonsavebtn();

});

Then('I validate certificate edited message is fired', async function () {

    await this.certificatespage.validateEditedSuccessMessage();

});

Then('I validate edited certificate is in the table', async function () {

    await expect(this.page.getByText(this.EditedCertificateName)).toBeVisible();

});


Then('Click on Hamberger menu of the edited certificate', async function () {

    await this.certificatespage.clickhamberger(this.EditedCertificateName);
});


Then('Get the count for the certificates Before creating', async function () {

    this.count = await this.certificatespage.getCertificatesCount();
    console.log("original count is: ", this.count);

});


Then('Validate the count got increased by one', async function () {

    const incrementedCount = await this.certificatespage.getCertificatesCount();
    this.incrementedCount = incrementedCount;
    console.log("Incremented count is: ", incrementedCount);
    expect(incrementedCount).toBe(this.count + 1)
    console.log("Count incremented correctly")

});

Then('I validate the count is decremented by one', async function () {

    expect(this.count).toBe(this.incrementedCount - 1)
    console.log("Count decremented correctly")

});

Then('Ensure that no certificates are present in the table', async function () {

    this.startcount = await this.certificatespage.getCertificatesCount();


    if (this.startcount > 0) {
        const originalcertificatelist = await this.certificatespage.fetch_all_certificates();
        for (existingcertificate of originalcertificatelist) {
            await this.certificatespage.clickhamberger(existingcertificate);
            await this.certificatespage.clickdeletebutton();
            await this.certificatespage.clickconfirmdeletebutton();
        }

        await this.page.waitForTimeout(5000);
        const finalcount = await this.certificatespage.getCertificatesCount();
        expect(finalcount).toBe(0);
    }
    else {
        console.log('No materials found, proceeding...');

    }
});

Then('Click on add new certificate button nux', async function () {

    await this.certificatespage.clickonnux();
});

