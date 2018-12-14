import * as React from 'react';
import {
  Header, Icon, Input, Segment,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class FileInput extends React.Component {
  state = { loading: false };

  handleChange = (e) => {
    const { handleFile } = this.props;
    const reader = new FileReader();

    reader.onload = () => {
      this.setState({ loading: false });

      const text = reader.result;

      handleFile(text);
    };

    reader.onerror = (err) => {
      this.setState({ loading: false });
      alert(err);
    };

    this.setState({ loading: true });
    reader.readAsText(e.target.files[0], 'windows-1252');
  };

  render() {
    const { loading } = this.state;

    return (
      <Segment
        textAlign="center"
        style={{
          display: 'flex',
          flexDirection: 'column',
          itemsAlign: 'center',
          justifyContent: 'center',
        }}
        loading={loading}
      >
        <Header as="h2" icon>
          <Icon name="cloud upload" />
          Upload SAF-T
        </Header>

        <Input type="file" accept=".xml" onChange={this.handleChange} />
      </Segment>
    );
  }
}

FileInput.propTypes = {
  handleFile: PropTypes.func.isRequired,
};

export default FileInput;
