class Tax {
    constructor({TaxType, TaxCountryRegion, TaxCode, Description, TaxExpirationDate, TaxPercentage, TaxAmount }){
        if (TaxType) this.type = TaxType[0];
        if (TaxCountryRegion) this.countryRegion = TaxCountryRegion[0];
        if (TaxCode) this.code = TaxCode[0];
        if (Description) this.description = Description[0];
        if (TaxExpirationDate) this.expirationDate = TaxExpirationDate[0];
        if (TaxPercentage) this.taxPercentage = TaxPercentage[0];
        if (TaxAmount) this.taxAmount = TaxAmount[0];
    }   
}

export default Tax