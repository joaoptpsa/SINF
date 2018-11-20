import React from 'react';
import {
  Divider, Select, Grid, Segment, Header,
} from 'semantic-ui-react';
import {
  BarChart,
  Bar,
  Legend,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
} from 'recharts';
import PropTypes from 'prop-types';
import GrowthSegment from './growthSegment';

const options = [
  {
    key: 'lastMonth',
    value: 'lastMonth',
    text: 'Last month',
  },
  {
    key: 'lastSemester',
    value: 'lastSemester',
    text: 'Last semester',
  },
];

const selectStyle = {
  backgroundColor: 'transparent',
  color: 'black',
};

const data = [
  {
    name: 'Apple',
    value: 100,
  },
  {
    name: 'Microsoft',
    value: 200,
  },
  {
    name: 'Google',
    value: 300,
  },
  {
    name: 'Github',
    value: 150,
  },
  {
    name: 'Others',
    value: 30,
  },
];

const pieData = [
  { name: 'Cellphones', value: 30 },
  { name: 'PCs', value: 20 },
  { name: 'Hardware', value: 15 },
  { name: 'Others', value: 5 },
];

// TODO: Show SAFT data

const Overview = ({ SAFT }) => (
  <Segment>
    <Select placeholder="Select time" options={options} style={selectStyle} />
    <Divider />
    <Grid stackable>
      <Grid.Row columns={5}>
        <Grid.Column>
          <GrowthSegment text="Liquidity" number="100%" isNegative />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Total Sales" number="100%" />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Total Purchases" number="100%" isNegative />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Gross Profit" number="100%" />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Total Stock Value" number="100%" isNegative />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Segment compact>
            <Header>Most valuable costumers</Header>
            <BarChart
              width={600}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment compact>
            <Header>Best seller product</Header>
            <PieChart width={400} height={300}>
              <Pie data={pieData} dataKey="value" label />
              <Legend />
            </PieChart>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

Overview.propTypes = {
  SAFT: PropTypes.object.isRequired,
};

export default Overview;
