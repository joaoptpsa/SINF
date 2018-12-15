import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getTotalPurchasesCost, getTotalStockValue } from 'primavera-web-api';

import DisplaySegment from '../displaySegment';
import dashboardPage, { InjectedProps } from '../dashboardPage';
import BarChartSegment from '../barChartSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPurchasesCost: getTotalPurchasesCost(),
      totalInventoryValue: getTotalStockValue(),
    };
  }

  render() {
    const {
      netTotalThisPeriod, netTotalGrowth, top5Costumers, top5Products,
    } = this.props;

    const { totalPurchasesCost, totalInventoryValue } = this.state;

    return (
      <Grid stackable>
        <Grid.Row columns={4}>
          <Grid.Column>
            <DisplaySegment
              text="Net Sales"
              number={netTotalThisPeriod}
              growth={netTotalGrowth}
              type="€"
            />
          </Grid.Column>
          <Grid.Column>
            <DisplaySegment text="Total Purchases" number={totalPurchasesCost} type="€" />
          </Grid.Column>
          <Grid.Column>
            <DisplaySegment text="Total Inventory Value" number={totalInventoryValue} type="€" />
          </Grid.Column>
          <Grid.Column>
            <DisplaySegment text="Quick ratio" number={100} type="%" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <BarChartSegment title="Most Valuable Costumers" infArray={top5Costumers} />
          </Grid.Column>
          <Grid.Column width={6}>
            <TopProductsPiechartSegment title="Best seller products" top5Products={top5Products} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Overview.propTypes = {
  SAFT: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  ...InjectedProps,
};

export default dashboardPage(Overview);
