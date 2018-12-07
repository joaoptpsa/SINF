import React from 'react';
import { Segment, Statistic, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DisplaySegment = ({ text, number, type }) => {
  let color;
  let changeIcon, typeIcon;

  if (number === 0) {
    color = 'yellow';
    changeIcon = null;
  } else if (number > 0) {
    color = 'green';
    changeIcon = <Icon color="green" name="arrow circle up" />;
  } else {
    color = 'red';
    changeIcon = <Icon color="red" name="arrow circle down" />;
  }

  if (type == "€") {
    typeIcon = <Icon name="euro" />;
  } else if (type == "%") {
    typeIcon = <Icon name="percent" />;
  } else {
    typeIcon = null;
  }



  return (
    <Segment textAlign="center" style={{ padding: '20px', minHeight: '140px', paddingTop: '35px' }}>
      <Statistic size="small" color={color}>
        <Statistic.Value>
          {changeIcon}
          {` ${number.toFixed(2)} `}
          {typeIcon}
        </Statistic.Value>
        <Statistic.Label>{text}</Statistic.Label>
      </Statistic>
    </Segment>
  );
};

DisplaySegment.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export default DisplaySegment;
