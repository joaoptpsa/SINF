import * as React from 'react';
import {
  Container, Input, Label, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CompanyInput = ({ handleChange }) => (
  <Container textAlign="center" fluid>
    <Input
      label={(
        <Label>
          <Icon name="factory" />
          Company Name
        </Label>
)}
      labelPosition="left"
      placeholder="DEMO"
      onChange={handleChange}
    />
  </Container>
);

CompanyInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default CompanyInput;
