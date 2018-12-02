import React from 'react';
import { Divider, Select, Segment } from 'semantic-ui-react';

const options = [
  {
    key: 'lastMonth',
    value: 'lastMonth',
    text: 'Last month',
  },
  {
    key: 'lastSemester',
    value: 'lastSemester',
    text: 'Last semester',
  },
];

const selectStyle = {
  backgroundColor: 'transparent',
  color: 'black',
};

const getInvoices = ({ invoices }, fromDate, toDate) => invoices.filter((invoice) => {
  const { date } = invoice;

  // filter dates off bounds
  if (date < fromDate || date > toDate) {
    return false;
  }

  return true;
});

const getSourceDocumentLines = (invoices) => {
  const sourceDocumentLines = [];

  invoices.forEach((invoice) => {
    invoice.lines.forEach((line) => {
      sourceDocumentLines.push(line);
    });
  });

  return sourceDocumentLines;
};

const getSoldProducts = (invoices) => {
  const products = {};

  getSourceDocumentLines(invoices).forEach((line) => {
    if (products[line.productCode]) products[line.productCode] += parseFloat(line.quantity);
    else products[line.productCode] = parseFloat(line.quantity);
  });

  return products;
};

const getTop5SoldProducts = (invoices, productList) => {
  // get all sold products
  const products = getSoldProducts(invoices);

  // get codes of the top 5 most sold products
  const sortedKeys = Object.keys(products)
    .sort((a, b) => products[b] - products[a])
    .splice(0, 5);

  const top5products = [];
  sortedKeys.forEach((key) => {
    top5products.push({ quantity: products[key], ...productList[key] });
  });

  return top5products;
};

const getCostumersNetTotal = (invoices) => {
  const customers = {};

  invoices.forEach((invoice) => {
    if (customers[invoice.customerID]) {
      customers[invoice.customerID] += parseFloat(invoice.documentTotals.netTotal);
    } else customers[invoice.customerID] = parseFloat(invoice.documentTotals.netTotal);
  });

  return customers;
};

const getTop5NetTotalCostumers = (invoices, costumerList) => {
  const customers = getCostumersNetTotal(invoices);

  // get codes of the top 5 gross total with customers
  const sortedKeys = Object.keys(customers)
    .sort((a, b) => customers[b] - customers[a])
    .splice(0, 5);

  const top5costumers = [];
  sortedKeys.forEach((key) => {
    top5costumers.push({ quantity: customers[key], ...costumerList[key] });
  });

  return top5costumers;
};

const getNetTotalFromInvoices = (invoices) => {
  const costumersNetTotal = getCostumersNetTotal(invoices);
  let total = 0;

  Object.keys(costumersNetTotal).forEach((key) => {
    total += costumersNetTotal[key];
  });

  return total;
};

const getNumSales = (invoices) => {
  // get all sold products
  const productsSold = getSoldProducts(invoices);
  let numSales = 0;

  Object.keys(productsSold).forEach((key) => {
    numSales += productsSold[key];
  });

  return numSales;
};

const getNumCostumers = (invoices) => {
  const costumers = {};

  invoices.forEach((invoice) => {
    costumers[invoice.costumerID] = true;
  });

  return Object.keys(costumers).length;
};

const dashboardPage = WrappedComponent => class extends React.Component {
  constructor(props) {
    super(props);

    this.setPeriod('lastSemester');
  }

    setPeriod = (period) => {
      const { SAFT } = this.props;
      const { endDate } = SAFT.header;

      const lastPeriodEndDate = new Date(endDate);
      const lastPeriodStartDate = new Date(endDate);
      const thisPeriodStartDate = new Date(endDate);
      const thisPeriodEndDate = new Date(endDate);

      switch (period) {
        case 'lastSemester':
          lastPeriodEndDate.setMonth(lastPeriodEndDate.getMonth() - 6);
          thisPeriodStartDate.setMonth(thisPeriodStartDate.getMonth() - 6);
          lastPeriodStartDate.setMonth(lastPeriodStartDate.getMonth() - 12);
          break;
        case 'lastMonth':
          lastPeriodEndDate.setMonth(lastPeriodEndDate.getMonth() - 1);
          thisPeriodStartDate.setMonth(thisPeriodStartDate.getMonth() - 1);
          lastPeriodStartDate.setMonth(lastPeriodStartDate.getMonth() - 2);
          break;
        default:
          break;
      }

      if (this.state) {
        this.setState({
          period,
          lastPeriodEndDate,
          lastPeriodStartDate,
          thisPeriodEndDate,
          thisPeriodStartDate,
        });
      } else {
        this.state = {
          period,
          lastPeriodEndDate,
          lastPeriodStartDate,
          thisPeriodEndDate,
          thisPeriodStartDate,
        };
      }
    };

    onDropdownChange = (e, data) => {
      this.setPeriod(data.value);
    };

    calculateDiff = (previousValue, newValue) => {
      if (previousValue !== 0) {
        return (newValue / previousValue - 1) * 100;
      }
      if (newValue !== 0) {
        return 100;
      }
      return 0;
    };

    render() {
      const { props } = this;
      const { SAFT } = props;

      const {
        period,
        lastPeriodEndDate,
        lastPeriodStartDate,
        thisPeriodEndDate,
        thisPeriodStartDate,
      } = this.state;

      const invoicesThisPeriod = getInvoices(
        SAFT.sourceDocuments,
        thisPeriodStartDate,
        thisPeriodEndDate,
      );

      const invoicesLastPeriod = getInvoices(
        SAFT.sourceDocuments,
        lastPeriodStartDate,
        lastPeriodEndDate,
      );

      const top5Products = getTop5SoldProducts(invoicesThisPeriod, SAFT.masterFiles.products);
      const top5Costumers = getTop5NetTotalCostumers(
        invoicesThisPeriod,
        SAFT.masterFiles.costumers,
      );

      // calculate increase in gross profit
      const netTotalThisPeriod = getNetTotalFromInvoices(invoicesThisPeriod);
      const netTotalLastPeriod = getNetTotalFromInvoices(invoicesLastPeriod);
      const netTotal = this.calculateDiff(netTotalLastPeriod, netTotalThisPeriod);

      // calculate increase in number of sales
      const numSalesThisPeriod = getNumSales(invoicesThisPeriod);
      const numSalesLastPeriod = getNumSales(invoicesLastPeriod);
      const numSales = this.calculateDiff(numSalesLastPeriod, numSalesThisPeriod);

      // calculate increase in number of clients
      const numCostumersThisPeriod = getNumCostumers(invoicesThisPeriod);
      const numCostumersLastPeriod = getNumCostumers(invoicesLastPeriod);
      const numCostumers = this.calculateDiff(numCostumersLastPeriod, numCostumersThisPeriod);

      const dashboardPageProps = {
        numSales,
        netTotal,
        top5Costumers,
        top5Products,
        period,
        numCostumers,
        getNetTotalFromInvoices,
        getNumCostumers,
        getNumSales,
      };

      return (
        <Segment>
          <Select
            placeholder="Select time"
            options={options}
            style={selectStyle}
            onChange={this.onDropdownChange}
            value={period}
          />
          <Divider />
          <WrappedComponent {...props} {...dashboardPageProps} />
        </Segment>
      );
    }
};

export default dashboardPage;
