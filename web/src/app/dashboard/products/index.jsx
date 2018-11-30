import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import GrowthSegment from '../growthSegment';
import dashboardPage from '../dashboardPage';
import MostValuableCostumersSegment from '../mostValuableCostumersSegment';
import BestSellerProductsSegment from '../bestSellerProductsSegment';

const Products = (props) => {
  const {
    SAFT, numSales, grossProfit, top5Costumers, top5Products, numCostumers,
  } = props;

  return (
    <Grid stackable>
      <Grid.Row columns={4}>
        <Grid.Column>
          <GrowthSegment text="Stock value" number={100} />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Total items" number={100} />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Stock growth" number={100} />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Out of stock items" number={100} />
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
        <Grid.Column width={10}>
          <MostValuableCostumersSegment top5Costumers={top5Costumers} />
        </Grid.Column>
        <Grid.Column width={6}>
          <BestSellerProductsSegment top5Products={top5Products} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Products.propTypes = {
  SAFT: PropTypes.object.isRequired,
};

export default dashboardPage(Products);
