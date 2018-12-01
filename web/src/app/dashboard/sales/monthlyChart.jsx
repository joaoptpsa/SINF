import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import PropTypes from 'prop-types';
import { Segment, Menu } from 'semantic-ui-react';

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

class MonthlyChart extends React.Component {
  state = { option: 'grossProfit' };

  renderLines = () => {};

  generateGraphData = (invoicesLastYear) => {
    const { getGrossProfitFromInvoices, getNumSales, getNumCostumers } = this.props;

    const data = [];

    Object.keys(invoicesLastYear).forEach((month) => {
      const invoicesInMonth = invoicesLastYear[month];

      data.push({
        name: monthNames[month],
        grossProfit: getGrossProfitFromInvoices(invoicesInMonth),
        costumers: getNumCostumers(invoicesInMonth),
        sales: getNumSales(invoicesInMonth),
      });
    });

    return data;
  };

  renderLine = () => {
    const { option } = this.state;

    switch (option) {
      case 'grossProfit':
        return <Line type="monotone" name="Gross profit" dataKey="grossProfit" stroke="#75cac3" />;
      case 'costumers':
        return (
          <Line type="monotone" name="Number of costumers" dataKey="costumers" stroke="#75cac3" />
        );
      case 'sales':
        return <Line type="monotone" name="Number of sales" dataKey="sales" stroke="#75cac3" />;
      default:
        return null;
    }
  };

  render() {
    const { invoices } = this.props;
    const { option } = this.state;
    const invoicesByYear = getInvoicesByDate(invoices);

    const lastYear = Object.keys(invoicesByYear)[Object.keys(invoicesByYear).length - 1];
    const invoicesLastYear = invoicesByYear[lastYear];

    const data = this.generateGraphData(invoicesLastYear);

    return (
      <Segment>
        <Menu>
          <Menu.Item
            name="Gross profit"
            active={option === 'grossProfit'}
            onClick={() => this.setState({ option: 'grossProfit' })}
          />
          <Menu.Item
            name="Number of costumers"
            active={option === 'costumers'}
            onClick={() => this.setState({ option: 'costumers' })}
          />
          <Menu.Item
            name="Number of sales"
            active={option === 'sales'}
            onClick={() => this.setState({ option: 'sales' })}
          />
        </Menu>

        <ResponsiveContainer height={300} width="90%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {this.renderLine()}
          </LineChart>
        </ResponsiveContainer>
      </Segment>
    );
  }
}

MonthlyChart.propTypes = {
  invoices: PropTypes.array.isRequired,
  getGrossProfitFromInvoices: PropTypes.func.isRequired,
  getNumSales: PropTypes.func.isRequired,
  getNumCostumers: PropTypes.func.isRequired,
};

export default MonthlyChart;
