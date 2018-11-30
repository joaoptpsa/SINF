import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import dashboardPage from '../dashboardPage';
import GrowthSegment from '../growthSegment';
import MostValuableCostumersSegment from '../mostValuableCostumersSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';

const Sales = (props) => {
  const {
    numSales, grossProfit, top5Costumers, top5Products, numCostumers,
  } = props;

  return (
    <Grid stackable>
      {/* growth segments */}
      <Grid.Row columns={3}>
        <Grid.Column>
          <GrowthSegment text="Number of sales" number={numSales} />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Number of costumers" number={numCostumers} />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Sales gross profit" number={grossProfit} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={10}>
          <MostValuableCostumersSegment top5Costumers={top5Costumers} />
        </Grid.Column>
        <Grid.Column width={6}>
          <TopProductsPiechartSegment title="Best seller products" top5Products={top5Products} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Segment>
            <Header>Line Graph</Header>
            <ResponsiveContainer height={300} width="90%">
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>Sales location</Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default dashboardPage(Sales);
