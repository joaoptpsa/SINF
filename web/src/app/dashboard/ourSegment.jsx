import React from 'react';
import { Segment, Statistic, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const OurSegment = ({ text, number }) => {
  let color;
  let icon;

  if (number === 0) {
    color = 'yellow';
    icon = null;
  } else if (number > 0) {
    color = 'green';
    icon = <Icon color="green" name="arrow circle up" />;
  } else {
    color = 'red';
    icon = <Icon color="red" name="arrow circle down" />;
  }

  return (
    <Segment textAlign="center" style={{ padding: '20px', minHeight: '140px', paddingTop: '35px' }}>
      <Statistic size="small" color={color}>
        <Statistic.Value>
          {icon}
          {`${number.toFixed(2)}`}
        </Statistic.Value>
        <Statistic.Label>{text}</Statistic.Label>
      </Statistic>
    </Segment>
  );
};

OurSegment.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export default OurSegment;
