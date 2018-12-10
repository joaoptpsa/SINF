import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import {
  ResponsiveContainer, PieChart, Pie, Legend, Cell,
} from 'recharts';
import PropTypes from 'prop-types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4444'];

const TopProductsPiechartSegment = ({
  title, top5Products, dataKey, nameKey,
}) => (
  <Segment>
    <Header>{title}</Header>
    <ResponsiveContainer height={300} width="90%">
      <PieChart>
        <Pie data={top5Products} dataKey={dataKey} nameKey={nameKey} label>
          {top5Products.map((entry, index) => (
            <Cell key={entry.code} fill={COLORS[index]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </Segment>
);

TopProductsPiechartSegment.defaultProps = {
  dataKey: 'quantity',
  nameKey: 'description',
};

TopProductsPiechartSegment.propTypes = {
  title: PropTypes.string.isRequired,
  top5Products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  dataKey: PropTypes.string,
  nameKey: PropTypes.string,
};

export default TopProductsPiechartSegment;
