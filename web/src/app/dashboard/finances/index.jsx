import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import dashboardPage from '../dashboardPage';
import PercentageSegment from '../percentageSegment';
import ValueSegment from '../valueSegment';
import OurSegment from '../ourSegment';
import MonthlyFinancesChartRight from './monthlyFinancesChartRight';

const Finances = (props) => {
  const {
    SAFT, getNumSales, getNumCustomers, getNetTotalFromInvoices, netTotal,
  } = props;

  return (
    <Grid>
      <Grid.Row columns={5}>
        <Grid.Column>
          <OurSegment text="Quick Ratio (ACID)" number={100} />
        </Grid.Column>
        <Grid.Column>
          <PercentageSegment text="Return on Sales" number={100} />
        </Grid.Column>
        <Grid.Column>
          <ValueSegment text="Net Sales" number={netTotal} />
        </Grid.Column>
        <Grid.Column>
          <ValueSegment text="Total Purchases" number={1723} />
        </Grid.Column>
        <Grid.Column>
          <ValueSegment text="Total Inventory Value" number={523} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
        <Grid.Column>
          <MonthlyFinancesChartRight
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

Finances.propTypes = {
  SAFT: PropTypes.object.isRequired,
  getNumSales: PropTypes.func.isRequired,
  getNumCustomers: PropTypes.func.isRequired,
  getNetTotalFromInvoices: PropTypes.func.isRequired,
  netTotal: PropTypes.number.isRequired,
};

export default dashboardPage(Finances);
