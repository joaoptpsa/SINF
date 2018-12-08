import * as React from 'react';
import {
  Segment, Header, Icon, Input, Container,
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
    <Container fluid>
      <Header icon>
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
