import AuditFile from './auditFile'
import { parseString } from 'xml2js'


/**
 * Parses SAF-T Document
 * @param {string} text 
 * @param {(Error, AuditFile) => void} callback 
 */
const parseSAFT = (text, callback) => {
    parseString(text, (err, xmlFile) => {
        if (err) return callback(err, null);

        const auditFile = new AuditFile(xmlFile.AuditFile);

        return callback(null, auditFile);
    });
}

export default parseSAFT