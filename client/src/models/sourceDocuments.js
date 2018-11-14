class Invoice {
    number;
    status;
    hash;
    hashControl;
    period;
    date;
    type;
    selfBillingIndicator;
    systemEntryDate;
    transactionID;
    customerID;

    constructor(XMLElement){


        this.number = XMLElement.InvoiceNo[0];
        if  (XMLElement.InvoiceStatus) this.status = XMLElement.InvoiceStatus[0];
        if (XMLElement.Hash) this.hash = XMLElement.Hash[0];
        if (XMLElement.HashControl) this.hashControl = XMLElement.HashControl[0];
        if (XMLElement.Period) this.period = XMLElement.Period[0];
        this.date = XMLElement.InvoiceDate[0];
        this.type = XMLElement.InvoiceType[0];
        if (XMLElement.SelfBillingIndicator) this.selfBillingIndicator = XMLElement.SelfBillingIndicator[0];
        this.systemEntryDate = XMLElement.SystemEntryDate[0];
        if (XMLElement.TransactionID) this.transactionID = XMLElement.TransactionID[0];
        this.customerID = XMLElement.CustomerID[0];

        // TODO: 
        console.log(XMLElement.ShipTo);
        console.log(XMLElement.ShipFrom);
        console.log(XMLElement.Line);
        console.log(XMLElement.DocumentTotals);
    }
}

class SalesInvoices {
    numberOfEntries;
    totalDebit;
    totalCredit;
    invoices;

    constructor(XMLElement){
        this.numberOfEntries = XMLElement.NumberOfEntries[0];
        this.totalDebit = XMLElement.TotalDebit[0];
        this.totalCredit = XMLElement.TotalCredit[0];

        this.invoices = [];
        for (const index in XMLElement.Invoice){
            this.invoices.push(new Invoice(XMLElement.Invoice[index]));
        }
    }
}

export default (XMLElement) => {
    const salesInvoices = new SalesInvoices(XMLElement.SalesInvoices[0])

    return salesInvoices
}