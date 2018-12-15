class GeneralLedger {
  constructor(XMLElement) {
    this.accountID = XMLElement.AccountID[0];
    this.accountDescription = XMLElement.AccountDescription[0];
    this.openingDebitBalance = XMLElement.OpeningDebitBalance[0];
    this.openingCreditBalance = XMLElement.OpeningCreditBalance[0];
    this.closingDebitBalance = XMLElement.ClosingDebitBalance[0];
    this.closingCreditBalance = XMLElement.ClosingCreditBalance[0];
    this.groupingCategory = XMLElement.GroupingCategory[0];
    if (XMLElement.GroupingCode) {
      this.groupingCode = XMLElement.GroupingCode[0];
    }
    if (XMLElement.TaxonomyCode) {
      this.taxonomyCode = XMLElement.TaxonomyCode[0];
    }
  }
}

export default GeneralLedger;
