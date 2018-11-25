import React from 'react';
import {
  Divider, Select, Grid, Segment, Header,
} from 'semantic-ui-react';
import {
  BarChart,
  Bar,
  Legend,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';
import GrowthSegment from './growthSegment';

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4444'];

// TODO: Show SAFT data

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

const getCustumersGrossTotal = (invoices) => {
  const customers = {};

  invoices.forEach((invoice) => {
    if (customers[invoice.customerID]) {
      customers[invoice.customerID] += parseFloat(invoice.documentTotals.grossTotal);
    } else customers[invoice.customerID] = parseFloat(invoice.documentTotals.grossTotal);
  });

  return customers;
};

const getTop5GrossTotalCostumers = (invoices, costumerList) => {
  const customers = getCustumersGrossTotal(invoices);

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

const getGrossProfit = (invoices) => {
  const costumersGrossTotal = getCustumersGrossTotal(invoices);
  let total = 0;

  Object.keys(costumersGrossTotal).forEach((key) => {
    total += costumersGrossTotal[key];
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

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.setPeriod('lastSemester');
  }

  setPeriod = (period) => {
    const { SAFT } = this.props;
    const { endDate, startDate } = SAFT.header;

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
    const { SAFT } = this.props;
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
    const top5Costumers = getTop5GrossTotalCostumers(
      invoicesThisPeriod,
      SAFT.masterFiles.costumers,
    );

    // calculate increase in gross profit
    const grossProfitThisPeriod = getGrossProfit(invoicesThisPeriod);
    const grossProfitLastPeriod = getGrossProfit(invoicesLastPeriod);
    const grossProfit = this.calculateDiff(grossProfitLastPeriod, grossProfitThisPeriod);

    // calculate increase in number of sales
    const numSalesThisPeriod = getNumSales(invoicesThisPeriod);
    const numSalesLastPeriod = getNumSales(invoicesLastPeriod);
    const numSales = this.calculateDiff(numSalesLastPeriod, numSalesThisPeriod);

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
        <Grid stackable>
          <Grid.Row columns={5}>
            <Grid.Column>
              <GrowthSegment text="Liquidity" number={100} />
            </Grid.Column>
            <Grid.Column>
              <GrowthSegment text="Total Sales" number={numSales} />
            </Grid.Column>
            <Grid.Column>
              <GrowthSegment text="Total Purchases" number={100} />
            </Grid.Column>
            <Grid.Column>
              <GrowthSegment text="Gross Profit" number={grossProfit} />
            </Grid.Column>
            <Grid.Column>
              <GrowthSegment text="Total Stock Value" number={100} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={10}>
              <Segment>
                <Header>Most valuable costumers</Header>
                <ResponsiveContainer height={300} width="90%">
                  <BarChart data={top5Costumers}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="companyName" interval="preserveStartEnd" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar name="Gross total" dataKey="quantity" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment>
                <Header>Best seller products</Header>
                <ResponsiveContainer height={300} width="90%">
                  <PieChart>
                    <Pie data={top5Products} dataKey="quantity" nameKey="description" label>
                      {top5Products.map((entry, index) => (
                        <Cell key={entry.code} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

Overview.propTypes = {
  SAFT: PropTypes.object.isRequired,
};

export default Overview;
