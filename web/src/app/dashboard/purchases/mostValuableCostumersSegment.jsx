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

const MostValuableCostumersSegment = ({ top5Costumers }) => (
  <Segment>
    <Header>Most valuable suppliers</Header>
    <ResponsiveContainer height={300} width="90%">
      <BarChart data={top5Costumers}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="companyName" interval="preserveStartEnd" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar name="Net total" dataKey="quantity" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </Segment>
);

MostValuableCostumersSegment.propTypes = {
  top5Costumers: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default MostValuableCostumersSegment;
