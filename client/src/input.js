import * as React from 'react'
import { parseString } from 'xml2js'
import { Header, Customer, Product } from './models'

const input = () => {
    const handleChange = (e) => {
  
        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result;
            //console.log(text);

            const xmlDoc = parseString(text, (err, {AuditFile}) => {
                if (err) return alert(err);

                // parse header
                const header = new Header(AuditFile.Header[0]);

                // TODO: parse MasterFiles
                const masterFilesXML = AuditFile.MasterFiles[0];
                let masterfiles = [];
                for(const element in masterFilesXML){
                    const XMLElement = masterFilesXML[element][0];

                    switch(element){
                        case 'Customer':
                        masterfiles.push(new Customer(XMLElement));
                        break;
                        case 'Product':
                        masterfiles.push(new Product(XMLElement));
                        break;
                        case 'TaxTable':
                        break;
                        case 'GeneralLedger':
                        break;
                        case 'Supplier':
                        break;
                        case '$':
                        break;
                        default:
                        console.log('Error: index not parsed ' + element);
                        break;
                    }
                }
            })
        }

        reader.readAsText(e.target.files[0]);
    }

    return (
        <input type="file" accept=".xml" onChange={handleChange}/>
    );
}

export default input