import { parseString } from 'xml2js';
import AuditFile from './auditFile';

/**
 * Parses SAF-T Document
 * @param {string} text
 * @param {(Error, AuditFile) => void} callback
 */
const parseSAFT = (text, callback) => {
  parseString(text, (err, xmlFile) => {
    if (err) return callback(err, null);

    console.log(xmlFile);

    const auditFile = new AuditFile(xmlFile.AuditFile);

    return callback(null, auditFile);
  });
};

export default parseSAFT;
