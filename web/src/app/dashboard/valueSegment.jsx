import React from 'react';
import { Segment, Statistic } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const valueSegment = ({ text, number }) => {
  let color;

  if (number === 0) {
    color = 'yellow';
  } else if (number > 0) {
    color = 'green';
  } else {
    color = 'red';
  }

  return (
    <Segment textAlign="center" style={{ padding: '20px', minHeight: '140px', paddingTop: '35px' }}>
      <Statistic size="small" color={color}>
        <Statistic.Value>{`${number.toFixed(2)}€`}</Statistic.Value>
        <Statistic.Label>{text}</Statistic.Label>
      </Statistic>
    </Segment>
  );
};

valueSegment.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export default valueSegment;
