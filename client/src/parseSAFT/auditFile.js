import Header from './header';
import parseMasterFiles from './masterFiles';
import GeneralLedgerEntries from './generalLedgerEntries';
import SalesInvoices from './sourceDocuments';

class AuditFile {
    header;
    masterFiles;
    generalLedgerEntries;
    sourceDocuments;

    constructor(XMLElement){
        // parse header
        this.header = new Header(XMLElement.Header[0]);
                
        // parse MasterFiles
        this.masterfiles = parseMasterFiles(XMLElement.MasterFiles[0]);
        
        // parse general ledger entries
        if (XMLElement.GeneralLedgerEntries){
            this.generalLedgerEntries = new GeneralLedgerEntries(XMLElement.GeneralLedgerEntries[0]);
        }

        // parse source documents
        if (XMLElement.SourceDocuments){
            const salesInvoicesXML = XMLElement.SourceDocuments[0].SalesInvoices[0];
            this.sourceDocuments = new SalesInvoices(salesInvoicesXML);
        }
    }
}

export default AuditFile;