import Customer from './customer';
import Supplier from './supplier';
import Product from './product';
import GeneralLedger from './generalLedger';
import Tax from '../tax';

const parseTaxTable = (XMLElement) => {
    let taxTable = [];
    
    for (const taxElement in XMLElement.TaxType){
        taxTable.push(new Tax(XMLElement.TaxType[taxElement]))
    }
    
    return taxTable;
}

const parseMasterFiles = XMLMasterFiles =>  {
    let masterfiles = [];
    
    for(const element in XMLMasterFiles){
        const XMLElement = XMLMasterFiles[element][0];
        
        switch(element){
            case 'Customer':
            masterfiles.push(new Customer(XMLElement));
            break;
            case 'Product':
            masterfiles.push(new Product(XMLElement));
            break;
            case 'TaxTable':
            masterfiles.push(parseTaxTable(XMLElement));
            break;
            case 'GeneralLedger':
            masterfiles.push(new GeneralLedger(XMLElement));
            break;
            case 'Supplier':
            masterfiles.push(new Supplier(XMLElement));
            break;
            case '$':
            break;
            default:
            console.log('Error: index not parsed ' + element);
            break;
        }
    }
    
    return masterfiles
    
}

export default parseMasterFiles;