import React from 'react';
import { Segment, Statistic, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const GrowthSegment = ({ text, number, isNegative }) => (
  <Segment textAlign="center" style={{ padding: '20px' }}>
    <Statistic>
      <Statistic.Value>
        {isNegative ? (
          <Icon color="red" name="arrow circle down" />
        ) : (
          <Icon color="green" name="arrow circle up" />
        )}
        {number}
      </Statistic.Value>
      <Statistic.Label>{text}</Statistic.Label>
    </Statistic>
  </Segment>
);

GrowthSegment.defaultProps = {
  isNegative: false,
};

GrowthSegment.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  isNegative: PropTypes.bool,
};

export default GrowthSegment;
