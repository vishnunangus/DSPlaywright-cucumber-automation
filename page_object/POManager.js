const { LoginPage } = require('../page_object/LoginPage')
const { MaterialPage } = require('../page_object/MaterialPage')

class POManager {

    constructor(page) {
        this.page = page;
        this.loginpage = new LoginPage(page);
        this.materialpage = new MaterialPage(page);
    }


    getLoginPage() {

        return this.loginpage;
    }

    getMaterialPage() {

        return this.materialpage;
    }

}

module.exports = { POManager };