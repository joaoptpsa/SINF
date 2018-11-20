import Address from '../address';

class Customer {
    constructor(XMLElement){
        this.customerID = XMLElement.CustomerID[0];
        if (XMLElement.AccountID) this.accountID = XMLElement.AccountID[0];
        this.customerTaxID = XMLElement.CustomerTaxID[0];
        this.companyName = XMLElement.CompanyName[0];
        if (XMLElement.Contact) this.contact = XMLElement.Contact[0];
        this.billingAddress = new Address(XMLElement.BillingAddress[0]);
        if (XMLElement.ShipToAddress) this.shipToAddress = new Address(XMLElement.ShipToAddress[0]);
        if (XMLElement.Telephone) this.telephone = XMLElement.Telephone[0];
        if (XMLElement.Fax) this.fax = XMLElement.Fax[0];
        if (XMLElement.Email) this.email = XMLElement.Email[0];
        if (XMLElement.Website) this.website = XMLElement.Website[0];
        if (XMLElement.SelfBillingIndicator) this.selfBillingIndicator = XMLElement.SelfBillingIndicator[0];
    }
}

export default Customer;