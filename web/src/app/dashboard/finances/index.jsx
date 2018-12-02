import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import dashboardPage from '../dashboardPage';
import GrowthSegment from '../growthSegment';
import MonthlyFinancesChartLeft from './monthlyFinancesChartLeft';
import MonthlyFinancesChartRight from './monthlyFinancesChartRight';

const Finances = (props) => {
  const {
    SAFT, getNumSales, getNumCostumers, getNetTotalFromInvoices,
  } = props;

  return (
    <Grid>
      <Grid.Row columns={3}>
        <Grid.Column>
          <GrowthSegment text="Return on sales" number={100} />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Return on assets" number={100} />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Return on equity" number={100} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>
          <MonthlyFinancesChartLeft
            invoices={SAFT.sourceDocuments.invoices}
            getNumSales={getNumSales}
            getNumCostumers={getNumCostumers}
            getNetTotalFromInvoices={getNetTotalFromInvoices}
          />
        </Grid.Column>
        <Grid.Column>
          <MonthlyFinancesChartRight
            invoices={SAFT.sourceDocuments.invoices}
            getNumSales={getNumSales}
            getNumCostumers={getNumCostumers}
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
  getNumCostumers: PropTypes.func.isRequired,
  getNetTotalFromInvoices: PropTypes.func.isRequired,
};

export default dashboardPage(Finances);
