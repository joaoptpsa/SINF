import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';
import PropTypes from 'prop-types';

const BarChartSegment = ({
  title, infArray, xAxisDataKey, barDataKey, barDataDescription,
}) => (
  <Segment>
    <Header>{title}</Header>
    <ResponsiveContainer height={300} width="90%">
      <BarChart data={infArray}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} interval="preserveStartEnd" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar name={barDataDescription} dataKey={barDataKey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </Segment>
);

BarChartSegment.defaultProps = {
  xAxisDataKey: 'companyName',
  barDataKey: 'quantity',
  barDataDescription: 'Net total',
};

BarChartSegment.propTypes = {
  title: PropTypes.string.isRequired,
  infArray: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  xAxisDataKey: PropTypes.string,
  barDataKey: PropTypes.string,
  barDataDescription: PropTypes.string,
};

export default BarChartSegment;
