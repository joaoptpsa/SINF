import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import dashboardPage from '../dashboardPage';
import DisplaySegment from '../displaySegment';
import MostValuableCostumersSegment from './mostValuableCostumersSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';
import MonthlyPurchasesChart from './monthlyPurchasesChart';

const Purchases = (props) => {
  const {
    SAFT,
    top5Costumers,
    top5Products,
    getNumSales,
    getNumCustomers,
    getNetTotalFromInvoices,
  } = props;

  return (
    <Grid>
      <Grid.Row columns={4}>
        <Grid.Column>
          <DisplaySegment text="Total Purchases" number={100} type="€" />
        </Grid.Column>
        <Grid.Column>
          <DisplaySegment text="Number of purchases" number={100} type="" />
        </Grid.Column>
        <Grid.Column>
          <DisplaySegment text="Number of suppliers" number={100} type="" />
        </Grid.Column>
        <Grid.Column>
          <DisplaySegment text="Cost of Goods sold" number={100} type="€" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={6}>
          <TopProductsPiechartSegment title="Top items bought" top5Products={top5Products} />
        </Grid.Column>
        <Grid.Column width={10}>
          <MostValuableCostumersSegment top5Costumers={top5Costumers} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={10}>
          <MonthlyPurchasesChart
            invoices={SAFT.sourceDocuments.invoices}
            getNumSales={getNumSales}
            getNumCustomers={getNumCustomers}
            getNetTotalFromInvoices={getNetTotalFromInvoices}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <TopProductsPiechartSegment title="Spending by item" top5Products={top5Products} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Purchases.propTypes = {
  SAFT: PropTypes.object.isRequired,
  top5Costumers: PropTypes.array.isRequired,
  top5Products: PropTypes.array.isRequired,
  getNumSales: PropTypes.func.isRequired,
  getNumCustomers: PropTypes.func.isRequired,
  getNetTotalFromInvoices: PropTypes.func.isRequired,
};

export default dashboardPage(Purchases);
