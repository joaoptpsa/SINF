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
import { Segment, Header } from 'semantic-ui-react';

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
  renderLines = () => {};

  render() {
    const { invoices } = this.props;
    const invoicesByYear = getInvoicesByDate(invoices);

    const lastYear = Object.keys(invoicesByYear)[Object.keys(invoicesByYear).length - 1];
    const invoicesLastYear = invoicesByYear[lastYear];

    return (
      <Segment>
        <Header>Line Graph</Header>
        <ResponsiveContainer height={300} width="90%">
          <LineChart
            data={[
              {
                name: 'Junuary',
                grossProfit: 133,
              },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" name="Gross profit" dataKey="grossProfit" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Segment>
    );
  }
}

MonthlyChart.propTypes = {
  invoices: PropTypes.array.isRequired,
};

export default MonthlyChart;
