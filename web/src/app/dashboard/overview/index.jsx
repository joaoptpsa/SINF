import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import GrowthSegment from '../growthSegment';
import dashboardPage from '../dashboardPage';
import MostValuableCostumersSegment from '../mostValuableCostumersSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';

const Overview = (props) => {
  const {
    numSales,
    grossProfit,
    top5Costumers,
    top5Products,
  } = props;

  return (
    <Grid stackable>
      <Grid.Row columns={5}>
        <Grid.Column>
          <GrowthSegment text="Liquidity" number={100} />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Total Sales" number={numSales} />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Total Purchases" number={100} />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Gross Profit" number={grossProfit} />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Total Stock Value" number={100} />
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
    </Grid>
  );
};

Overview.propTypes = {
  SAFT: PropTypes.object.isRequired,
};

export default dashboardPage(Overview);
