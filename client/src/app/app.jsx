import * as React from 'react';
import { Container } from 'semantic-ui-react';
import FileInput from './fileInput';
import parseSAFT from '../parseSAFT';
import Dashboard from './dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { SAFT: null };
  }

    handleFile = (text) => {
      /* parse xml */
      parseSAFT(text, (err, auditFile) => {
        if (err) return alert(err);

        this.setState({ SAFT: auditFile });
      });
    }

    render() {
      const { SAFT } = this.state;

      if (!SAFT) {
        return (
          <Container>
            <FileInput handleFile={this.handleFile} />
          </Container>);
      }
      return <Dashboard saft={SAFT} />;
    }
}

export default App;
