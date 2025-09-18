const { Given, When, Then, } = require('@cucumber/cucumber');
const { LoginPage } = require('../../page_object/LoginPage');
const { expect } = require('playwright/test');
const { POManager } = require('../../page_object/POManager');


Given('I open the DS application', async function () {

 
  this.loginpage = this.POManager.getLoginPage();
  
  await this.page.goto('https://testing.app.e-dot.com/auth/login')

});

When('I login with {string} and {string}', async function (usernamefield, passowrdfield) {

  await this.loginpage.login(usernamefield, passowrdfield)

});

Then('I Click on Login button', async function () {

  await this.loginpage.clickLogin()

});

When('Click on Launch button', async function () {

  await this.loginpage.launchApp();

});

Then('Validate user logged in to the DS Homepage', async function () {

  await this.loginpage.Validation();

});

 When('I click on logout option', async function () {

  await this.loginpage.logout();
           
         });


Then('user should be logged out of the application', async function () {

  await this.loginpage.validate_logout_sucess();
           
         });         

