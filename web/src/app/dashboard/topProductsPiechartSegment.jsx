import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import {
  ResponsiveContainer, PieChart, Pie, Legend, Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4444'];

const TopProductsPiechartSegment = ({ title, top5Products }) => (
  <Segment>
    <Header>{title}</Header>
    <ResponsiveContainer height={300} width="90%">
      <PieChart>
        <Pie data={top5Products} dataKey="quantity" nameKey="description" label>
          {top5Products.map((entry, index) => (
            <Cell key={entry.code} fill={COLORS[index]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </Segment>
);

export default TopProductsPiechartSegment;
