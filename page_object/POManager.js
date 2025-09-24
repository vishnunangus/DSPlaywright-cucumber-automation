const { LoginPage } = require('../page_object/LoginPage')
const { MaterialPage } = require('../page_object/MaterialPage')
const { CertificatesPage } = require('../page_object/CertificatesPage')

class POManager {

    constructor(page) {
        this.page = page;
        this.loginpage = new LoginPage(page);
        this.materialpage = new MaterialPage(page);
        this.certificatespage = new CertificatesPage(page)
    }


    getLoginPage() {

        return this.loginpage;
    }

    getMaterialPage() {

        return this.materialpage;
    }

    getCertificatesPage()
    {
        return this.certificatespage;

    }

}

module.exports = { POManager };