import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import GrowthSegment from '../growthSegment';
import dashboardPage from '../dashboardPage';
import MostValuableCostumersSegment from '../mostValuableCostumersSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';

const Overview = (props) => {
  const { netTotal, top5Costumers, top5Products } = props;

  return (
    <Grid stackable>
      <Grid.Row columns={4}>
        <Grid.Column>
          <GrowthSegment text="Net Sales" number={netTotal} />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Cost of Goods sold" number={100} />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Total Inventory Value" number={100} />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Quick ratio" number={100} />
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
  netTotal: PropTypes.number.isRequired,
  top5Costumers: PropTypes.array.isRequired,
  top5Products: PropTypes.array.isRequired,
};

export default dashboardPage(Overview);
