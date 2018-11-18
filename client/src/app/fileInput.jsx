import * as React from 'react';
import {
  Segment, Header, Icon, Input,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const FileInput = ({ handleFile }) => {
  const handleChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;

      handleFile(text);
    };

    reader.readAsText(e.target.files[0]);
  };

  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="cloud upload" />
    Upload SAF-T
      </Header>
      <Segment.Inline>
        <Input type="file" accept=".xml" onChange={handleChange} />
      </Segment.Inline>
    </Segment>
  );
};

FileInput.propTypes = {
  handleFile: PropTypes.func.isRequired,
};


export default FileInput;
