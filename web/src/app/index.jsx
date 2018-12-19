import * as React from 'react';
import {
  Container,
  Segment,
  Button,
  Divider,
  Input,
  Label,
  Icon,
  Message,
} from 'semantic-ui-react';
import parseSAFT from 'saft2js';
import { getToken, loadDb } from 'primavera-web-api';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FileInput from './fileInput';
import Dashboard from './dashboard';

class App extends React.Component {
  state = {
    SAFT: null,
    url: 'http://localhost:2018/WebApi',
    companyName: '',
    success: false,
    loading: false,
    error: undefined,
  };

  setError = (error) => {
    console.error(error);
    this.setState({ error, loading: false, success: false });
  };

  handleFile = (text) => {
    this.setState({ loading: true });

    /* parse xml */
    parseSAFT(text, (err, auditFile) => {
      this.setState({ loading: false });

      if (err) {
        this.setError(err);
        return;
      }

      console.log('Audit file loaded!');
      console.log(auditFile);

      this.setState({ SAFT: auditFile });
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
      this.setError(e);
    }
  };

  render() {
    const {
      SAFT, companyName, loading, url, success, error,
    } = this.state;

    if (!success) {
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
            color="blue"
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
              placeholder="http://localhost:2018/WebApi"
              name="url"
              onChange={this.handleText}
            />

            <Divider />

            {error != null ? (
              <Message negative>
                <Message.Header>{error.name}</Message.Header>
                <p>{error.message}</p>
              </Message>
            ) : null}

            <Button disabled={companyName === '' || url === '' || !SAFT} onClick={this.handleClick}>
              Submit
            </Button>
          </Segment>
        </Container>
      );
    }

    return (
      <Router>
        <Route render={props => <Dashboard SAFT={SAFT} {...props} />} />
      </Router>
    );
  }
}

export default App;
