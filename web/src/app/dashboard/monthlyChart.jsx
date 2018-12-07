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
import { Segment, Menu, Grid } from 'semantic-ui-react';

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

const options = {
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

class MonthlyChart extends React.Component {
  constructor(props) {
    super(props);
    const {
      invoices, getNetTotalFromInvoices, getNumCustomers, getNumSales,
    } = props;

    const invoicesByYear = getInvoicesByDate(invoices);

    // create data object
    this.data = {};
    Object.keys(invoicesByYear).forEach((year) => {
      const invoicesInYear = invoicesByYear[year];
      this.data[year] = [];

      Object.keys(invoicesInYear).forEach((month) => {
        const invoicesInMonth = invoicesInYear[month];

        this.data[year].push({
          name: monthNames[month],
          netTotal: getNetTotalFromInvoices(invoicesInMonth),
          costumers: getNumCustomers(invoicesInMonth),
          sales: getNumSales(invoicesInMonth),
        });
      });
    });

    this.state = { option: options.netTotal.key, selectedYear: Object.keys(this.data)[0] };
  }

  renderLine = () => {
    const { option } = this.state;

    switch (option) {
      case 'netTotal':
        return (
          <Line
            type="monotone"
            name={options.netTotal.name}
            dataKey={options.netTotal.key}
            stroke="#75cac3"
          />
        );
      case 'costumers':
        return (
          <Line
            type="monotone"
            name={options.costumers.name}
            dataKey={options.costumers.key}
            stroke="#75cac3"
          />
        );
      case 'sales':
        return (
          <Line
            type="monotone"
            name={options.sales.name}
            dataKey={options.sales.key}
            stroke="#75cac3"
          />
        );
      default:
        return null;
    }
  };

  renderYearMenu = () => {
    const { selectedYear } = this.state;
    const items = [];

    Object.keys(this.data).forEach((year) => {
      items.push(
        <Menu.Item
          key={`${year}`}
          name={`${year}`}
          active={selectedYear === year}
          onClick={() => this.setState({ selectedYear: year })}
        />,
      );
    });

    return <Menu>{items}</Menu>;
  };

  render() {
    const { option, selectedYear } = this.state;

    return (
      <Segment>
        {this.renderYearMenu()}
        <Grid columns={2}>
          <Grid.Column width={4}>
            <Menu vertical pointing>
              <Menu.Item
                name={options.netTotal.name}
                active={option === options.netTotal.key}
                onClick={() => this.setState({ option: options.netTotal.key })}
              />
              <Menu.Item
                name={options.costumers.name}
                active={option === options.costumers.key}
                onClick={() => this.setState({ option: options.costumers.key })}
              />
              <Menu.Item
                name={options.sales.name}
                active={option === options.sales.key}
                onClick={() => this.setState({ option: options.sales.key })}
              />
            </Menu>
          </Grid.Column>
          <Grid.Column width={12}>
            <ResponsiveContainer height={300} width="100%">
              <LineChart data={[...this.data[selectedYear]]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {this.renderLine()}
              </LineChart>
            </ResponsiveContainer>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

MonthlyChart.propTypes = {
  invoices: PropTypes.array.isRequired,
  getNetTotalFromInvoices: PropTypes.func.isRequired,
  getNumSales: PropTypes.func.isRequired,
  getNumCustomers: PropTypes.func.isRequired,
};

export default MonthlyChart;
