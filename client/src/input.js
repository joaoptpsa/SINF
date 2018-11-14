import * as React from 'react'
import { parseString } from 'xml2js'
import { Header, Customer, Product, Supplier } from './models'

const parseMasterFiles = (masterFilesXML) => {
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
            // TODO:
            break;
            case 'GeneralLedger':
            // TODO:
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

    return masterfiles;
}

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
                const masterfiles = parseMasterFiles(masterFilesXML);
               
                console.log(masterfiles)
            })
        }

        reader.readAsText(e.target.files[0]);
    }

    return (
        <input type="file" accept=".xml" onChange={handleChange}/>
    );
}

export default input