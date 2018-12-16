import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getNoPurchases, getTotalPurchasesCost } from 'primavera-web-api';

import dashboardPage from '../dashboardPage';
import DisplaySegment from '../displaySegment';
import TopSuppliersBarChartSegment from './topSuppliersBarChartSegment';
import MonthlyPurchasesChart from './monthlyPurchasesChart';

class Purchases extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noTotalPurchases: getNoPurchases(),
      totalPurchasesCost: getTotalPurchasesCost(),
    };
  }

  render() {
    const { numSuppliers } = this.props;

    const { noTotalPurchases, totalPurchasesCost } = this.state;

    return (
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column>
            <DisplaySegment text="Total Purchases" number={totalPurchasesCost} type="€" />
          </Grid.Column>
          <Grid.Column>
            <DisplaySegment text="Number of purchases" number={noTotalPurchases} type="" />
          </Grid.Column>
          <Grid.Column>
            <DisplaySegment text="Number of suppliers" number={numSuppliers} type="" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <TopSuppliersBarChartSegment />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <MonthlyPurchasesChart />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Purchases.propTypes = {
  numSuppliers: PropTypes.number.isRequired,
};

export default dashboardPage(Purchases);
