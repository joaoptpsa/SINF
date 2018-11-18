import * as React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import FileInput from './fileInput';
import parseSAFT from '../parseSAFT';
import Dashboard from './dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { SAFT: null, loading: false };
  }

  handleFile = (text) => {
    this.setState({ loading: true });

    /* parse xml */
    parseSAFT(text, (err, auditFile) => {
      this.setState({ loading: false });

      if (err) return alert(err);

      this.setState({ SAFT: auditFile });
    });
  }

  render() {
    const { SAFT, loading } = this.state;


    if (!SAFT) {
      return (
        <Container>
          <Segment loading={loading}>
            <FileInput handleFile={this.handleFile} />
          </Segment>
        </Container>);
    }
    return <Dashboard saft={SAFT} />;
  }
}

export default App;
