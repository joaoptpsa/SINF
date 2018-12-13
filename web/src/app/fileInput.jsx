import * as React from 'react';
import {
  Container, Header, Icon, Input,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const FileInput = ({ handleFile }) => {
  const handleChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;

      handleFile(text);
    };

    reader.readAsText(e.target.files[0], 'windows-1252');
  };

  return (
    <Container
      textAlign="center"
      style={{
        display: 'flex',
        flexDirection: 'column',
        itemsAlign: 'center',
        justifyContent: 'center',
      }}
    >
      <Header as="h2" icon>
        <Icon name="cloud upload" />
        Upload SAF-T
      </Header>

      <Input type="file" accept=".xml" onChange={handleChange} />
    </Container>
  );
};

FileInput.propTypes = {
  handleFile: PropTypes.func.isRequired,
};

export default FileInput;
