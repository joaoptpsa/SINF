import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getTotalPurchasesCost, getTotalStockValue } from 'primavera-web-api';

import DisplaySegment from '../displaySegment';
import dashboardPage, { InjectedProps } from '../dashboardPage';
import BarChartSegment from '../barChartSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';

const getGeneralLedgerAccount = (SAFT, id) => {
  if (!SAFT.masterFiles.generalLedgerAccounts[`${id}`]) {
    return null;
  }

  const Account = {};
  Account.openingPeriod = Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts[`${id}`].openingDebitBalance)
    - Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts[`${id}`].openingCreditBalance);
  Account.closingPeriod = Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts[`${id}`].closingDebitBalance)
    - Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts[`${id}`].closingCreditBalance);
  let openingPeriodSign = 1;
  if (Account.openingPeriod < 0) {
    openingPeriodSign *= -1;
  }
  Account.growth = (Account.closingPeriod / Account.openingPeriod) * 100 * openingPeriodSign;
  return Account;
};

const getGrossProfit = (SAFT) => {
  const netRevenue = getGeneralLedgerAccount(SAFT, 71);
  const cogs = getGeneralLedgerAccount(SAFT, 61);

  if (netRevenue && cogs) {
    const gp = {};
    gp.openingPeriod = netRevenue.openingPeriod - cogs.openingPeriod;
    gp.closingPeriod = netRevenue.closingPeriod - cogs.closingPeriod;
    let openingPeriodSign = 1;
    if (gp.openingPeriod < 0) {
      openingPeriodSign *= -1;
    }
    gp.growth = (gp.closingPeriod / gp.openingPeriod) * 100 * openingPeriodSign;
    return gp;
  }
  return null;
};

class Overview extends React.Component {
  constructor(props) {
    super(props);
    const { SAFT } = props;

    const grossProfit = getGrossProfit(SAFT);
    this.state = {
      totalPurchasesCost: getTotalPurchasesCost(),
      totalInventoryValue: getTotalStockValue(),
      grossProfit,
    };
  }

  render() {
    const {
      netTotalThisPeriod, netTotalGrowth, top5Costumers, top5Products,
    } = this.props;

    const { totalPurchasesCost, totalInventoryValue, grossProfit } = this.state;

    if (grossProfit == null) {
      return (
        <Grid stackable>
          <Grid.Row columns={3}>
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
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={10}>
              <BarChartSegment title="Most Valuable Costumers" infArray={top5Costumers} />
            </Grid.Column>
            <Grid.Column width={6}>
              <TopProductsPiechartSegment
                title="Best seller products"
                top5Products={top5Products}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }

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
            <DisplaySegment
              text="Gross Profit"
              number={grossProfit.closingPeriod}
              type="€"
              growth={grossProfit.growth}
            />
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
