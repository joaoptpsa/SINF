import Address from './address';
import Tax from './tax';

class OrderReference {
  constructor(XMLElement) {
    if (XMLElement.OriginatingON) this.originatingON = XMLElement.OriginatingON[0];
    if (XMLElement.OrderDate) this.orderDate = XMLElement.OrderDate[0];
  }
}

class Line {
  constructor(XMLElement) {
    this.lineNumber = XMLElement.LineNumber[0];
    this.orderReferences = [];
    // Parse order references
    for (const index in XMLElement.OrderReferences) {
      this.orderReferences.push(new OrderReference(XMLElement.OrderReferences[index]));
    }

    this.productCode = XMLElement.ProductCode[0];
    this.productDescription = XMLElement.ProductDescription[0];
    this.quantity = XMLElement.Quantity[0];
    if (XMLElement.UnitOfMeasure) this.unitOfMeasure = XMLElement.UnitOfMeasure[0];
    this.unitPrice = XMLElement.UnitPrice[0];
    this.taxPointDate = XMLElement.TaxPointDate[0];

    // TODO: Parse References
    if (XMLElement.References) this.references = XMLElement.References[0];

    this.description = XMLElement.Description[0];
    this.debitAmount = XMLElement.DebitAmount[0];
    this.creditAmount = XMLElement.CreditAmount[0];

    // tax
    this.taxes = [];
    for (const index in XMLElement.Tax) {
      this.taxes.push(new Tax(XMLElement.Tax[index]));
    }

    if (XMLElement.TaxExemptionReason) this.taxExemptionReason = XMLElement.TaxExemptionReason[0];
    if (XMLElement.SettlementAmount) this.settlementAmount = XMLElement.SettlementAmount[0];
  }
}

class Shipment {
  contructor(XMLElement) {
    if (XMLElement.DeliveryID) this.deliveryID = XMLElement.DeliveryID[0];
    if (XMLElement.DeliveryDate) this.deliveryDate = XMLElement.DeliveryDate[0];
    this.address = new Address(XMLElement.Address[0]);
  }
}

class Currency {
  constructor({ CurrencyCode, CurrencyDebitAmount, CurrencyCreditAmount }) {
    if (CurrencyCode) this.code = CurrencyCode[0];
    if (CurrencyDebitAmount) this.debitAmount = CurrencyDebitAmount[0];
    if (CurrencyCreditAmount) this.creditAmount = CurrencyCreditAmount[0];
  }
}

class Settlement {
  constructor({
    SettlementDiscount, SettlementAmount, SettlementDate, PaymentMechanism,
  }) {
    if (SettlementDiscount) this.discount = SettlementDiscount[0];
    if (SettlementAmount) this.amount = SettlementAmount[0];
    if (SettlementDate) this.date = SettlementDate[0];
    if (PaymentMechanism) this.mechanism = PaymentMechanism[0];
  }
}

class DocumentTotal {
  constructor(XMLElement) {
    this.taxPayable = XMLElement.TaxPayable[0];
    this.netTotal = XMLElement.NetTotal[0];
    this.grossTotal = XMLElement.GrossTotal[0];
    if (XMLElement.Currency) this.currency = new Currency(XMLElement.Currency[0]);
    if (XMLElement.Settlement) this.settlement = new Settlement(XMLElement.Settlement[0]);
  }
}

class Invoice {
  constructor(XMLElement) {
    this.number = XMLElement.InvoiceNo[0];
    if (XMLElement.InvoiceStatus) this.status = XMLElement.InvoiceStatus[0];
    if (XMLElement.Hash) this.hash = XMLElement.Hash[0];
    if (XMLElement.HashControl) this.hashControl = XMLElement.HashControl[0];
    if (XMLElement.Period) this.period = XMLElement.Period[0];
    this.date = XMLElement.InvoiceDate[0];
    this.type = XMLElement.InvoiceType[0];
    if (XMLElement.SelfBillingIndicator) this.selfBillingIndicator = XMLElement.SelfBillingIndicator[0];
    this.systemEntryDate = XMLElement.SystemEntryDate[0];
    if (XMLElement.TransactionID) this.transactionID = XMLElement.TransactionID[0];
    this.customerID = XMLElement.CustomerID[0];

    if (XMLElement.ShipTo) this.shipTo = new Shipment(XMLElement.ShipTo[0]);
    if (XMLElement.ShipFrom) this.shipFrom = new Shipment(XMLElement.ShipFrom[0]);

    // parse lines
    this.lines = [];
    for (const index in XMLElement.Line) {
      this.lines.push(new Line(XMLElement.Line[index]));
    }

    this.documentTotals = new DocumentTotal(XMLElement.DocumentTotals[0]);
  }
}

class SalesInvoices {
  constructor(XMLElement) {
    this.numberOfEntries = XMLElement.NumberOfEntries[0];
    this.totalDebit = XMLElement.TotalDebit[0];
    this.totalCredit = XMLElement.TotalCredit[0];

    this.invoices = [];
    for (const index in XMLElement.Invoice) {
      this.invoices.push(new Invoice(XMLElement.Invoice[index]));
    }
  }
}

export default SalesInvoices;
