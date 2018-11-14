class GeneralLedger {
    accountID;
    accountDescription;
    openingDebitBalance;
    openingCreditBalance;

    constructor(XMLElement){
        this.accountID = XMLElement.AccountID[0];
        this.accountDescription = XMLElement.AccountDescription[0];
        this.openingCreditBalance = XMLElement.OpeningCreditBalance[0];
        this.openingDebitBalance = XMLElement.OpeningDebitBalance[0];
    }
}

export default GeneralLedger;