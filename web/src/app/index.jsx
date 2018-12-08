import * as React from 'react';
import {
  Container, Segment, Input, Label, Icon, Form, Button,
} from 'semantic-ui-react';
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

    await getToken();
  };

  render() {
    const { SAFT, companyName, loading } = this.state;

    if (!SAFT || !companyName) {
      return (
        <Container>
          <Segment loading={loading}>
            <Form>
              <Form.Field>
                <FileInput handleFile={this.handleFile} />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label={(
                    <Label>
                      <Icon size="big" name="factory" />
                      Company Name
                    </Label>
                  )}
                  labelPosition="left"
                  placeholder="BELAFLOR"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Button onClick={this.handleClick}>Submit</Button>
              </Form.Field>
            </Form>
          </Segment>
        </Container>
      );
    }

    return <Dashboard SAFT={SAFT} />;
  }
}

export default App;
