class Line {
    constructor(XMLElement){
        this.recordID = XMLElement.RecordID[0];
        this.accontID = XMLElement.AccountID[0];
        if (XMLElement.CreditAmount) this.creditAmount = XMLElement.CreditAmount[0];
        if (XMLElement.DebitAmount) this.debitAmount = XMLElement.DebitAmount[0];
        if (XMLElement.SourceDocumentID) this.sourceDocumentID = XMLElement.SourceDocumentID[0];
        this.systemEntryDate = XMLElement.SystemEntryDate[0];
        this.description = XMLElement.Description[0];
    }
}

class Transaction {
    constructor(XMLElement){
        this.id = XMLElement.TransactionID[0];
        this.period = XMLElement.Period[0];
        this.date = XMLElement.TransactionDate[0];
        if (XMLElement.SourceID) this.sourceID = XMLElement.SourceID[0];
        this.description = XMLElement.Description[0];
        if (XMLElement.DocArchivalNumber) this.docArchivalNumber = XMLElement.DocArchivalNumber[0];
        if (XMLElement.TransactionType) this.type = XMLElement.TransactionType[0];
        this.glPostingDate = XMLElement.GLPostingDate[0];
        if (XMLElement.CustomerID) this.customerID = XMLElement.CustomerID[0];
        this.supplierID = XMLElement.SupplierID[0];

        this.lines = [];
        for(const index in XMLElement.Line){
            this.lines.push(new Line(XMLElement.Line[index]));
        }
    }
}

class Journal {
    constructor(XMLElement){
        this.id = XMLElement.JournalID[0];
        this.description = XMLElement.Description[0];
        this.transactions = [];

        for (const index in XMLElement.Transaction){
            this.transactions.push(new Transaction(XMLElement.Transaction[index]))
        }
    }
}

class GeneralLedgerEntries {
    constructor(XMLElement){
        this.numberOfEntries = XMLElement.NumberOfEntries[0];
        this.totalCredit = XMLElement.TotalCredit[0];
        this.totalDebit = XMLElement.TotalDebit[0];
        this.journal = new Journal(XMLElement.Journal[0]);
    }
}

export default GeneralLedgerEntries