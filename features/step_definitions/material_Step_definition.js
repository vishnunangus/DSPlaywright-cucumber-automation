const { Given, When, Then, } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');
const { POManager } = require('../../page_object/POManager');
const { MaterialPage } = require('../../page_object/MaterialPage')
const path = require('path');
const ExcelUtils = require('../../utils/excelUtils');

let uploadedMaterials = [];


Then('Click on Material certificates page', async function () {

    this.materialpage = this.POManager.getMaterialPage();
    await this.materialpage.clickonMaterialsbutton();


});


Then('Click on plus icon', async function () {

    await this.materialpage.clickaddIcon();
});

Then('Click on Add new material button', async function () {

    await this.materialpage.clickonaddmaterialbutton();
});

Then('Enter the Material Name as {string}', async function (MaterialName) {

    const uniqueName = `${MaterialName}_${Date.now()}`;
    this.uniqueMaterialName = uniqueName;

    await this.materialpage.Entermaterialname(uniqueName);

});

Then('Click on Submit button', async function () {

    await this.materialpage.clicksubmit();

});


Then('Validate the sucess mesaage for material creation', async function () {

    await expect(this.page.getByText('Material created successfully')).toBeVisible();


});

Then('Validate the created material is in the table', async function () {

    await expect(this.page.getByText(this.uniqueMaterialName)).toBeVisible();

});

Then('Click on hamberger button for the created material', async function () {

    await this.materialpage.clickhamberger(this.uniqueMaterialName);


});


Then('Click on Delete button', async function () {

    await this.materialpage.clickdeletebutton();
    await this.materialpage.clickconfirmdeletebutton();
});


Then('Validate the deleted message is fired sucessfully', async function () {

    await expect(this.page.getByText('Material deleted successfully')).toBeVisible();
});

Then('Validate the material is not present in the table after the deletion', async function () {

    await expect(this.page.getByText(this.uniqueMaterialName)).not.toBeVisible();

});



Then('Click on hamberger button for the updated material', async function () {
    await this.materialpage.clickhamberger(this.uniqueupdatedMaterialName);
});


Then('Click on edit button', async function () {
    await this.materialpage.clickeditbutton();
});


Then('Enter the updated material name as {string}', async function (suffix) {

    const uniqueupdatedMaterialName = `${this.uniqueMaterialName}${suffix}`;
    this.uniqueupdatedMaterialName = uniqueupdatedMaterialName;

    await this.materialpage.Enterupdatedmaterialname(uniqueupdatedMaterialName);
});


Then('Click on save button', async function () {

    await this.materialpage.clicksavebutton();
});

Then('Validate the edited message fired sucessfully', async function () {

    await expect(this.page.getByText('Material edited successfully')).toBeVisible();
});

Then('Validate the updated name of material is present in the table', async function () {

    await expect(this.page.getByText(this.uniqueupdatedMaterialName)).toBeVisible();
});

Then('Click on Delete button of the updated material', async function () {

    await this.materialpage.clickhamberger(this.uniqueupdatedMaterialName);
    await this.materialpage.clickdeletebutton();
    await this.materialpage.clickconfirmdeletebutton();


});

Then('Validate the deleted message is fired sucessfully for updated material', async function () {

    await expect(this.page.getByText('Material deleted successfully')).toBeVisible();

});

Then('Validate the updated material is not present in the table after the deletion', async function () {

    await expect(this.page.getByText(this.uniqueupdatedMaterialName)).not.toBeVisible();

});


Then('Validate the material name', async function () {


    const actualMaterialName = await this.materialpage.getMaterialName(this.uniqueMaterialName);
    await expect(actualMaterialName).toBe(this.uniqueMaterialName);

});

Then('Validate the material creation date', async function () {
    const now = new Date();

    const expectedTime = now.toLocaleString('en-US', {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",

    }).replace(',', '');

    const actualTime = await this.materialpage.getMaterialCreatedDate(this.uniqueMaterialName);

    await expect(actualTime).toBe(expectedTime);
});

;

Then('Validate the material created by field is {string}', async function (actualCreatedName) {

    const expectedCreatedName = await this.materialpage.getMaterialCreatedName(this.uniqueMaterialName);
    await expect(actualCreatedName).toBe(expectedCreatedName);

});

Then('Click on search bar and enter the created material', async function () {

    await this.materialpage.enterSearchText(this.uniqueMaterialName);
});


Then('Validate the search results are filtered based on search text', async function () {

    const rows = await this.materialpage.validateSearchResults(this.uniqueMaterialName);
    await expect(rows).toHaveCount(1);
    await expect(rows).toContainText(this.uniqueMaterialName);

});

Then('get the count before the material creation', async function () {

    this.count = await this.materialpage.getMaterialCount();
    console.log(this.count);
});


Then('Validate the material count is incremented by one', async function () {

    const incrementedCount = await this.materialpage.getMaterialCount();
    this.incrementedCount = incrementedCount;
    console.log(incrementedCount);
    expect(incrementedCount).toBe(this.count + 1);
    console.log("Count incremented correctly");


});

Then('Validate the material count is decremented by one', async function () {

    expect(this.count).toBe(this.incrementedCount - 1);
    console.log("Count decremented correctly");


});

Then('click on button bulk upload material list', async function () {

    await this.materialpage.bulkoptionclick();

});


Then('upload a csv file which contains the list of materials', async function () {

    const filePath = path.resolve(__dirname, '../../test-data/Material.csv');
    uploadedMaterials = await ExcelUtils.readCsv(filePath);
    console.log('Parsed Materials:', uploadedMaterials);
    await this.materialpage.uploadCsvFile(filePath);

});


Then('Click on savebutton from the csv upload modal', async function () {

    await this.materialpage.clickSaveButton();

});


Then('Validate the success message is fired sucessfully', async function () {

    await expect(this.materialpage.bulksuccess_msg).toHaveText("Upload Successful!");

    await this.materialpage.close();


});

Then('compare the details from csv file with the material data in the UI', async function () {

    for (const materialName of uploadedMaterials) {
        const materialRow = this.page.locator(`tr:has(td[title="${materialName}"])`);
        await expect(materialRow).toBeVisible();
    }

});


When('I delete all the materials uploaded using csv bulk upload', async function () {

    await this.materialpage.deleteUploadedMaterials(uploadedMaterials)

});

Then('Validate materials are not present in the table', async function () {

    for (const Validatedeletedmaterial of uploadedMaterials) {
        await expect(this.page.getByText(Validatedeletedmaterial)).not.toBeVisible();


    }
});         