import Header from './header';
import parseMasterFiles from './masterFiles';
import GeneralLedgerEntries from './generalLedgerEntries';

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

        // TODO: Parse source documents
        if (XMLElement.SourceDocuments){
            console.log(XMLElement.SourceDocuments)
        }
    }
}

export default AuditFile;