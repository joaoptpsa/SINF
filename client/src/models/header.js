import Address from './address';

class Header {
    auditFileVersion = null;
    companyID = null;
    taxRegistrationNumber = null;
    taxAccountingBasis = null;
    companyName = null;
    businessName = null;
    companyAddress = null;
    fiscalYear = null;
    startDate = null;
    endDate = null;
    currencyCode = null;
    dateCreated = null;
    taxEntity = null;
    productCompanyTaxID = null;
    softwareCertificateNumber = null;
    productId = null;
    productVersion = null;
    headerComment = null;
    telephone = null;
    fax = null;
    email = null;
    website = null;

    constructor(XMLElement){
        this.auditFileVersion = XMLElement.AuditFileVersion[0];
        this.companyID = XMLElement.CompanyID[0];
        this.companyName = XMLElement.CompanyName[0];
        this.currencyCode = XMLElement.CurrencyCode[0];
        this.dateCreated = XMLElement.DateCreated[0];
        this.endDate = XMLElement.EndDate[0];
        this.fiscalYear = XMLElement.FiscalYear[0];
        this.productId = XMLElement.ProductID[0];
        this.productVersion = XMLElement.ProductVersion[0];
        this.startDate = XMLElement.StartDate[0];
        this.taxRegistrationNumber = XMLElement.TaxRegistrationNumber[0];
        this.taxAccountingBasis = XMLElement.TaxAccountingBasis[0];

        /*  parse company address */
        this.companyAddress = new Address(XMLElement.CompanyAddress[0]);

        /* parse optionals */
        if (XMLElement.Telephone) this.telephone = XMLElement.Telephone[0];
        if (XMLElement.Website) this.website = XMLElement.Website[0];
        if (XMLElement.TaxEntity) this.taxEntity = XMLElement.TaxEntity[0];
        if (XMLElement.BusinessName) this.businessName = XMLElement.businessName[0];
        if (XMLElement.Fax) this.fax = XMLElement.Fax[0];
        if (XMLElement.Email) this.email = XMLElement.Email[0];
        if (XMLElement.HeaderComment) this.headerComment = XMLElement.HeaderComment[0];
        if (XMLElement.ProductCompanyTaxID) this.productCompanyTaxID = XMLElement.ProductCompanyTaxID[0];
        if (XMLElement.SoftwareCertificateNumber) this.softwareCertificateNumber = XMLElement.softwareCertificateNumber[0];
    }
}

export default Header