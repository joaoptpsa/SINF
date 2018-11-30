import Header from './header';
import MasterFiles from './masterFiles';
import GeneralLedgerEntries from './generalLedgerEntries';
import SalesInvoices from './sourceDocuments';

class AuditFile {
  constructor(XMLElement) {
    // parse header
    this.header = new Header(XMLElement.Header[0]);

    // parse MasterFiles
    this.masterFiles = new MasterFiles(XMLElement.MasterFiles[0]);

    // parse general ledger entries
    if (XMLElement.GeneralLedgerEntries) {
      this.generalLedgerEntries = new GeneralLedgerEntries(XMLElement.GeneralLedgerEntries[0]);
    }

    // parse source documents
    if (XMLElement.SourceDocuments) {
      const salesInvoicesXML = XMLElement.SourceDocuments[0].SalesInvoices[0];
      this.sourceDocuments = new SalesInvoices(salesInvoicesXML);
      // TODO: OTHER SOURCE DOCUMENTS = ex movement of goods.
    }
  }
}

export default AuditFile;