import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getTotalStockValue, getTotalStock, getNoOutOfStockProfucts } from 'primavera-web-api';

import DisplaySegment from '../displaySegment';
import TopStockedProductsPiechartSegment from './topStockedProductsPiechartSegment';
import ProductsTable from './productsTable';
import dashboardPage, { InjectedProps } from '../dashboardPage';
import MostUrgentBuysList from './mostUrgentBuys';

class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalInventoryValue: getTotalStockValue(),
      numberOfStockedItems: getTotalStock(),
      numberOfOutOfStockItems: getNoOutOfStockProfucts(),
    };
  }

  render() {
    const { totalInventoryValue, numberOfStockedItems, numberOfOutOfStockItems } = this.state;

    return (
      <Grid stackable>
        <Grid.Row columns={3}>
          <Grid.Column>
            <DisplaySegment text="Total Inventory value" number={totalInventoryValue} type="€" />
          </Grid.Column>
          <Grid.Column>
            <DisplaySegment text="Total items" number={numberOfStockedItems} type="" />
          </Grid.Column>
          <Grid.Column>
            <DisplaySegment text="Out of stock items" number={numberOfOutOfStockItems} type="" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={10} height={300}>
            <ProductsTable />
          </Grid.Column>
          <Grid.Column width={6}>
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column width={16}>
                  <TopStockedProductsPiechartSegment />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column width={16}>
                  <MostUrgentBuysList />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Products.defaultProps = {
  companyName: 'DEMO',
};

Products.propTypes = {
  SAFT: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  companyName: PropTypes.string,
  ...InjectedProps,
};

export default dashboardPage(Products);
