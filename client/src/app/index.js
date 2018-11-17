import * as React from 'react';
import FileInput from './fileInput';
import {Container} from 'semantic-ui-react';
import parseSAFT from '../parseSAFT'

class App extends React.Component {
    state = {
        SAFT: null
    };
    
    handleFile = (text) => {
        /* parse xml */
        parseSAFT(text, (err, auditFile) => {
            if (err) return alert(err);
            
            console.log('Parsed Audit File:');
            console.log(auditFile);
        }); 
    }
    
    render(){
        const {SAFT} = this.state;
        
        if (!SAFT){
            return (
                <Container>
                    <FileInput handleFile={this.handleFile} />
                </Container>)
            }
            return (
                null
                )
            }
        }
        
        export default App;