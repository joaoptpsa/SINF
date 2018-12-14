import * as React from 'react';
import {
  Container, Segment, Button, Divider, Input, Label, Icon,
} from 'semantic-ui-react';
import parseSAFT from 'saft2js';
import { getToken, loadDb } from 'primavera-web-api';
import FileInput from './fileInput';
import Dashboard from './dashboard';

class App extends React.Component {
  state = {
    SAFT: null,
    url: '',
    companyName: '',
    success: false,
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
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = async () => {
    const { companyName, url } = this.state;

    this.setState({ loading: true });

    try {
      await getToken(companyName, url);
      await loadDb();
      this.setState({ loading: false, success: true });
    } catch (e) {
      console.error(e.message);
      alert(e);
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      SAFT, companyName, loading, url, success,
    } = this.state;

    if (!success) {
      // if (!SAFT) {
      return (
        <Container
          style={{
            display: 'flex',
            padding: 25,
            itemsAlign: 'center',
            justifyContent: 'center',
          }}
        >
          <Segment
            loading={loading}
            style={{
              flexDirection: 'column',
              display: 'flex',
              justifyContent: 'center',
              itemsAlign: 'center',
              maxWidth: '600px',
            }}
          >
            <FileInput handleFile={this.handleFile} />

            <Divider />

            <Input
              label={(
                <Label>
                  <Icon name="factory" />
                  Company Name
                </Label>
)}
              labelPosition="left"
              placeholder="DEMO"
              onChange={this.handleText}
              value={companyName}
              name="companyName"
            />

            <Divider />

            <Input
              label={(
                <Label>
                  <Icon name="computer" />
                  URL Primavera Web API
                </Label>
)}
              value={url}
              placeholder="http://192.168.1.83:2018/WebApi/"
              name="url"
              onChange={this.handleText}
            />

            <Divider />

            <Button disabled={companyName === '' || url === '' || !SAFT} onClick={this.handleClick}>
              Submit
            </Button>
          </Segment>
        </Container>
      );
    }

    return <Dashboard SAFT={SAFT} />;
  }
}

export default App;
