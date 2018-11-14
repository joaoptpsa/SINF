import * as React from 'react'
import { parseString } from 'xml2js'
import AuditFile, { Header, parseMasterFiles, GeneralLedgerEntries } from './models'

const input = () => {
    const handleChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            const text = reader.result;
            
            /* parse xml */
            const xmlDoc = parseString(text, (err, xmlFile) => {
                if (err) return alert(err);
                
                // parse xml audit file
                const auditFile = new AuditFile(xmlFile.AuditFile);
            })
        }
        
        reader.readAsText(e.target.files[0]);
    }
    
    return (
        <input type="file" accept=".xml" onChange={handleChange}/>
        );
    }
    
    export default input