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
import BestSellerProductsSegment from '../bestSellerProductsSegment';
import MonthlyChart from './monthlyChart';

const Sales = (props) => {
  const {
    SAFT, numSales, grossProfit, top5Costumers, top5Products, numCostumers,
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
          <BestSellerProductsSegment top5Products={top5Products} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>
          <MonthlyChart invoices={SAFT.sourceDocuments.invoices} />
        </Grid.Column>
        <Grid.Column>
          <Segment>Sales location</Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default dashboardPage(Sales);
