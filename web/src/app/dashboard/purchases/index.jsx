import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { getNoPurchases, getTotalPurchasesCost, getNumSuppliers } from 'primavera-web-api';

import DisplaySegment from '../displaySegment';
import BiggestSuppliersBarChartSegment from './biggestSuppliersBarChartSegment';
import MonthlyPurchasesChart from './monthlyPurchasesChart';

class Purchases extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noTotalPurchases: getNoPurchases(),
      totalPurchasesCost: getTotalPurchasesCost(),
      numSuppliers: getNumSuppliers(),
    };
  }

  render() {
    const { noTotalPurchases, totalPurchasesCost, numSuppliers } = this.state;

    return (
      <Segment>
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
          <Grid.Row>
            <Grid.Column>
              <MonthlyPurchasesChart />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={10}>
              <BiggestSuppliersBarChartSegment />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default Purchases;
