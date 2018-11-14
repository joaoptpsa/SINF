import Address from './address'

class Supplier {
    id;
    accountId;
    supplierTaxId;
    companyName;
    contact;
    billingAddress;
    shipFromAddress;
    telephone;
    fax;
    email;
    website;
    selfBillingIndicator;

    constructor(XMLElement){
        this.id = XMLElement.SupplierID[0];
        if(XMLElement.AccountID) this.accountId = XMLElement.AccountID[0];
        this.supplierTaxId = XMLElement.SupplierTaxID[0];
        this.companyName = XMLElement.CompanyName[0];
        if (XMLElement.Contact) this.contact = XMLElement.Contact[0];
        this.billingAddress = new Address(XMLElement.BillingAddress[0]);
        if (XMLElement.ShipFromAddress) this.shipFromAddress = new Address(XMLElement.ShipFromAddress[0]);
        if (XMLElement.Telephone) this.telephone = XMLElement.Telephone[0];
        if (XMLElement.Fax) this.fax = XMLElement.Fax[0];
        if (XMLElement.Email) this.email = XMLElement.Email[0];
        if (XMLElement.Website) this.website = XMLElement.Website[0];
        if (XMLElement.SelfBillingIndicator) this.selfBillingIndicator = XMLElement.SelfBillingIndicator[0];
    }
}

export default Supplier