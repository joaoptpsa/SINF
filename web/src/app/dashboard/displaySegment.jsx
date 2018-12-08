import React from 'react';
import { Segment, Statistic, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DisplaySegment = ({
  text, number, type, growth,
}) => {
  let color;
  let changeIcon;
  let typeIcon;

  if (type == '€') {
    typeIcon = <Icon name="euro" />;
  } else if (type == '%') {
    typeIcon = <Icon name="percent" />;
  } else {
    typeIcon = null;
  }

  if (growth == 0) {
    color = 'yellow';
    changeIcon = null;
  } else if (growth > 0) {
    color = 'green';
    changeIcon = <Icon color="green" name="arrow circle up" />;
  } else if (growth < 0) {
    color = 'red';
    changeIcon = <Icon color="red" name="arrow circle down" />;
  } else {
    // null (default)
    color = 'black';
    changeIcon = null;
  }

  return (
    <Segment textAlign="center" style={{ padding: '20px', minHeight: '140px', paddingTop: '35px' }}>
      <Statistic size="huge" color={color}>
        <Statistic.Value text>
          {changeIcon}
          {` ${number.toFixed(2)} `}
          {typeIcon}
        </Statistic.Value>
        <Statistic.Label>{text}</Statistic.Label>
      </Statistic>
    </Segment>
  );
};

DisplaySegment.defaultProps = {
  type: '',
  growth: 0,
};

DisplaySegment.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  type: PropTypes.string,
  growth: PropTypes.number,
};

export default DisplaySegment;
