import React from 'react';
import { Segment, Statistic, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DisplaySegment = ({
  text, loading, number, type, growth,
}) => {
  let color;
  let changeIcon;
  let typeIcon;

  if (type === '€') {
    typeIcon = '€';
  } else if (type === '%') {
    typeIcon = '%';
  } else {
    typeIcon = '';
  }

  if (growth === 0) {
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

  let formattedNumber = Number.isInteger(number) ? number : number.toFixed(2);
  formattedNumber = formattedNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  return (
    <Segment
      loading={loading}
      style={{
        padding: '20px',
        height: '100%',
        paddingTop: '35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Statistic color={color} size="large">
        <Statistic.Value text>
          {changeIcon}
          {` ${typeIcon} ${formattedNumber} `}
        </Statistic.Value>
        <Statistic.Label style={{ marginTop: '3px' }}>{text}</Statistic.Label>
      </Statistic>
    </Segment>
  );
};

DisplaySegment.defaultProps = {
  type: '',
  loading: false,
  growth: 0,
};

DisplaySegment.propTypes = {
  text: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  number: PropTypes.number.isRequired,
  type: PropTypes.string,
  growth: PropTypes.number,
};

export default DisplaySegment;
