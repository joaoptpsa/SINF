import * as React from 'react';
import { Container, Segment, Input, Label, Icon, Button, Header } from 'semantic-ui-react';
import parseSAFT from 'saft2js';
import { getToken } from 'primavera-web-api';
import FileInput from './fileInput';
import Dashboard from './dashboard';

class App extends React.Component {
  state = {
    SAFT: null,
    textInput: null,
    companyName: null,
    loading: false,
  };

  // startDb = async (companyName) => {
  //   console.log(companyName);
  //   await getToken(companyName);
  // }

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

  handleChange = (e) => {
    this.setState({ textInput: e.target.value });
  };

  handleClick = async () => {
    const { textInput } = this.state;
    this.setState({ companyName: textInput });

    // this.startDb(textInput);
  };

  render() {
    const { SAFT, companyName, loading } = this.state;

    if (!SAFT || !companyName) {
      return (
        <Container>
          <Segment placeholder loading={loading}>
            <FileInput handleFile={this.handleFile} />
            <Segment.Inline fluid />
            <Container textAlign='center' fluid>
              <Input
                label={(
                  <Label>
                    <Icon name="factory" />
                    Company Name
                    </Label>
                )}
                labelPosition="left"
                placeholder="BELAFLOR"
                onChange={this.handleChange}
              />
            </Container>
            <Segment.Inline fluid />
            <Button onClick={this.handleClick}>Submit</Button>
          </Segment>
        </Container>
      );
    }

    return <Dashboard SAFT={SAFT} />;
  }
}

export default App;
