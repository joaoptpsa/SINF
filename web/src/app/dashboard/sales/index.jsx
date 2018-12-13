import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import dashboardPage, { InjectedProps } from '../dashboardPage';
import BarChartSegment from '../barChartSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';
import MonthlyChart from '../monthlyChart';
import DisplaySegment from '../displaySegment';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const monthlyChartOptions = {
  netTotal: {
    name: 'Net Sales',
    key: 'netTotal',
  },
  costumers: {
    name: 'Number of costumers',
    key: 'costumers',
  },
  sales: {
    name: 'Number of sales',
    key: 'sales',
  },
};

const getInvoicesByDate = (invoices) => {
  const years = {};

  invoices.forEach((invoice) => {
    const { date } = invoice;
    const month = date.getMonth();
    const year = date.getFullYear();

    if (!years[year]) {
      years[year] = {};
      years[year][month] = [invoice];
    } else if (!years[year][month]) {
      years[year][month] = [invoice];
    } else {
      years[year][month].push(invoice);
    }
  });

  return years;
};

const Sales = (props) => {
  const {
    getNetTotalFromInvoices,
    getNumCustomers,
    getNumSales,
    SAFT,
    numSales,
    netTotal,
    top5Costumers,
    top5Products,
    numCostumers,
  } = props;

  const invoicesByYear = getInvoicesByDate(SAFT.sourceDocuments.invoices);

  // create data object
  const data = {};
  Object.keys(invoicesByYear).forEach((year) => {
    const invoicesInYear = invoicesByYear[year];
    data[year] = [];

    Object.keys(invoicesInYear).forEach((month) => {
      const invoicesInMonth = invoicesInYear[month];

      data[year].push({
        name: monthNames[month],
        netTotal: getNetTotalFromInvoices(invoicesInMonth),
        costumers: getNumCustomers(invoicesInMonth),
        sales: getNumSales(invoicesInMonth),
      });
    });
  });

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
          <BarChartSegment title="Most Valuable Costumers" infArray={top5Costumers} />
        </Grid.Column>
        <Grid.Column width={6}>
          <TopProductsPiechartSegment title="Best seller products" top5Products={top5Products} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
        <Grid.Column>
          <MonthlyChart data={data} options={monthlyChartOptions} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Sales.propTypes = {
  SAFT: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  ...InjectedProps,
};

export default dashboardPage(Sales);
