import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import dashboardPage from '../dashboardPage';
import MostValuableCostumersSegment from '../mostValuableCostumersSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';
import MonthlyChart from '../monthlyChart';
import DisplaySegment from '../displaySegment';

const Sales = (props) => {
  const {
    SAFT,
    numSales,
    netTotal,
    top5Costumers,
    top5Products,
    numCostumers,
    getNumSales,
    getNumCustomers,
    getNetTotalFromInvoices,
  } = props;

  return (
    <Grid stackable>
      {/* growth segments */}
      <Grid.Row columns={3}>
        <Grid.Column>
          <DisplaySegment text="Net Sales" number={netTotal} type="€" />
        </Grid.Column>
        <Grid.Column>
          <DisplaySegment text="Number of costumers" number={numCostumers} type="" />
        </Grid.Column>
        <Grid.Column>
          <DisplaySegment text="Number of sales" number={numSales} type="€" />
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
      <Grid.Row columns={1}>
        <Grid.Column>
          <MonthlyChart
            invoices={SAFT.sourceDocuments.invoices}
            getNumSales={getNumSales}
            getNumCustomers={getNumCustomers}
            getNetTotalFromInvoices={getNetTotalFromInvoices}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Sales.propTypes = {
  SAFT: PropTypes.object.isRequired,
  numSales: PropTypes.number.isRequired,
  netTotal: PropTypes.number.isRequired,
  top5Costumers: PropTypes.array.isRequired,
  top5Products: PropTypes.array.isRequired,
  numCostumers: PropTypes.number.isRequired,
  getNumSales: PropTypes.func.isRequired,
  getNumCustomers: PropTypes.func.isRequired,
  getNetTotalFromInvoices: PropTypes.func.isRequired,
};

export default dashboardPage(Sales);
