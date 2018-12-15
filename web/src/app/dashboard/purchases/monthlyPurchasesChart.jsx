import React from 'react';
import { Segment, Menu, Grid } from 'semantic-ui-react';
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
import { getPurchasesInformation } from 'primavera-web-api';

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

const getPurchasesGroupedByDate = (purchases) => {
  const years = {};

  purchases.forEach((purchase) => {
    const date = new Date(purchase.DataDoc);
    const month = date.getMonth();
    const year = date.getFullYear();

    if (!years[year]) {
      years[year] = {};
      years[year][month] = [purchase];
    } else if (!years[year][month]) {
      years[year][month] = [purchase];
    } else {
      years[year][month].push(purchase);
    }
  });

  return years;
};

const calculateTotalPurchases = (purchases) => {
  let total = 0;

  purchases.forEach((purchase) => {
    total += purchase.TotalCompras;
  });

  return total;
};

const monthlyPurchasesChartOptions = {
  totalPurchases: {
    name: 'Purchases',
    key: 'totalPurchases',
  },
};

class MonthlyPurchasesChart extends React.Component {
  constructor(props) {
    super(props);

    const purchasesInformation = getPurchasesInformation();
    const purchasesGroupedByDate = getPurchasesGroupedByDate(purchasesInformation);

    const data = {};
    Object.keys(purchasesGroupedByDate).forEach((year) => {
      const purchasesInYear = purchasesGroupedByDate[year];
      data[year] = [];

      Object.keys(purchasesInYear).forEach((month) => {
        const purchasesInMonth = purchasesInYear[month];

        data[year].push({
          name: monthNames[month],
          totalPurchases: calculateTotalPurchases(purchasesInMonth),
        });
      });
    });

    this.state = {
      data,
      selectedOption: Object.keys(monthlyPurchasesChartOptions)[0],
      selectedYear: Object.keys(data)[0],
    };
  }

  renderLine = () => {
    const { selectedOption } = this.state;
    const selectedItem = monthlyPurchasesChartOptions[selectedOption];

    return (
      <Line type="monotone" name={selectedItem.name} dataKey={selectedItem.key} stroke="#75cac3" />
    );
  };

  renderYearMenu = () => {
    const { selectedYear, data } = this.state;
    const items = [];

    Object.keys(data).forEach((year) => {
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

  renderOptions = () => {
    const { selectedOption } = this.state;

    const items = [];

    Object.keys(monthlyPurchasesChartOptions).forEach((key) => {
      const item = monthlyPurchasesChartOptions[key];

      items.push(
        <Menu.Item
          key={`${key}`}
          name={item.name}
          active={selectedOption === item.key}
          onClick={() => this.setState({ selectedOption: item.key })}
        />,
      );
    });

    return items;
  };

  render() {
    const { data, selectedYear } = this.state;
    return (
      <Segment>
        {this.renderYearMenu()}
        <Grid columns={2}>
          <Grid.Column width={4}>
            <Menu vertical pointing>
              {this.renderOptions()}
            </Menu>
          </Grid.Column>
          <Grid.Column width={12}>
            <ResponsiveContainer height={300} width="100%">
              <LineChart data={[...data[selectedYear]]}>
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

export default MonthlyPurchasesChart;
