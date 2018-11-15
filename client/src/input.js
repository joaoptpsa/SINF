import * as React from 'react'
import parseSAFT from './parseSAFT'

const input = () => {
    const handleChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            const text = reader.result;
            
            /* parse xml */
            parseSAFT(text, (err, auditFile) => {
                if (err) return alert(err);
                
                console.log('Parsed Audit File:');
                console.log(auditFile);
            })
        }
        
        reader.readAsText(e.target.files[0]);
    }
    
    return (
        <input type="file" accept=".xml" onChange={handleChange}/>
        );
    }
    
    export default input