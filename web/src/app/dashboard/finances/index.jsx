import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import dashboardPage from '../dashboardPage';
import DisplaySegment from '../displaySegment';
import MonthlyFinancesChartRight from './monthlyFinancesChartRight';

const Finances = (props) => {
  const {
    SAFT, getNumSales, getNumCustomers, getNetTotalFromInvoices, netTotal,
  } = props;

  return (
    <Grid>
      <Grid.Row columns={5}>
        <Grid.Column>
          <DisplaySegment text="Quick Ratio (ACID)" number={100} type="%" growth="10" />
        </Grid.Column>
        <Grid.Column>
          <DisplaySegment text="Return on Sales" number={100} type="%" />
        </Grid.Column>
        <Grid.Column>
          <DisplaySegment text="Net Sales" number={netTotal} type="€" />
        </Grid.Column>
        <Grid.Column>
          <DisplaySegment text="Total Purchases" number={1723} type="€" />
        </Grid.Column>
        <Grid.Column>
          <DisplaySegment text="Total Inventory Value" number={523} type="€" />
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
