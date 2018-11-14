class TaxTableEntry {
    type;
    countryRegion;
    code;
    description;
    expirationDate;
    taxPercentage;
    taxAmount;

    constructor(XMLElement){
        if (XMLElement.TaxType) this.type = XMLElement.TaxType[0];
        if (XMLElement.TaxCountryRegion) this.countryRegion = XMLElement.TaxCountryRegion[0];
        if (XMLElement.TaxCode) this.code = XMLElement.TaxCode[0];
        if (XMLElement.Description) this.description = XMLElement.Description[0];
        if (XMLElement.TaxExpirationDate) this.expirationDate = XMLElement.TaxExpirationDate[0];
        if (XMLElement.TaxPercentage) this.taxPercentage = XMLElement.TaxPercentage[0];
        if (XMLElement.TaxAmount) this.taxAmount = XMLElement.TaxAmount[0];
    }   
}

export default TaxTableEntry