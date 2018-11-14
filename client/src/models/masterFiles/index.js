import Customer from './customer';
import Supplier from './supplier';
import Product from './product';
import GeneralLedger from './generalLedger';

class MasterFiles {
    constructor(XMLMasterFiles){
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
                // TODO:
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
        
        this.files = masterfiles;
    }
}

export default MasterFiles;