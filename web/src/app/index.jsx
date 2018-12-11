import * as React from 'react';
import { Container, Segment, Button } from 'semantic-ui-react';
import parseSAFT from 'saft2js';
import { getToken } from 'primavera-web-api';
import FileInput from './fileInput';
import CompanyInput from './companyInput';
import Dashboard from './dashboard';

class App extends React.Component {
  state = {
    SAFT: null,
    textInput: null,
    companyName: null,
    loading: false,
  };

  handleFile = (text) => {
    this.setState({ loading: true });

    /* parse xml */
    parseSAFT(text, (err, auditFile) => {
      this.setState({ loading: false });

      if (err) alert(err);
      else {
        console.log('Audit file loaded!');
        console.log(auditFile);

        this.setState({ SAFT: auditFile });
      }
    });
  };

  handleText = (e) => {
    this.setState({ textInput: e.target.value });
  };

  handleClick = async () => {
    const { textInput } = this.state;
    this.setState({ loading: true });

    await getToken(textInput);

    this.setState({ companyName: textInput, loading: false });
  };

  render() {
    const { SAFT, companyName, loading } = this.state;

    if (!SAFT || !companyName) {
      return (
        <Container>
          <Segment placeholder loading={loading}>
            <FileInput handleFile={this.handleFile} />
            <Segment.Inline />
            <CompanyInput handleText={this.handleText} />
            <Segment.Inline />
            <Button onClick={this.handleClick}>Submit</Button>
          </Segment>
        </Container>
      );
    }

    return <Dashboard SAFT={SAFT} />;
  }
}

export default App;
