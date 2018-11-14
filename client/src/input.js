import * as React from 'react'
import { parseString } from 'xml2js'
import { Header } from './models'

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
            })
        }

        reader.readAsText(e.target.files[0]);
    }

    return (
        <input type="file" accept=".xml" onChange={handleChange}/>
    );
}

export default input