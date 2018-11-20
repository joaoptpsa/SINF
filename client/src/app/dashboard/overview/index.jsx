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

const data = [
  {
    name: 'Apple',
    value: 100,
  },
  {
    name: 'Microsoft',
    value: 200,
  },
  {
    name: 'Google',
    value: 300,
  },
  {
    name: 'Github',
    value: 150,
  },
  {
    name: 'Others',
    value: 30,
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4444'];

// TODO: Show SAFT data

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

const getTop5SoldProducts = (invoices) => {
  // get all sold products
  const products = getSoldProducts(invoices);

  // get codes of the top 5 most sold products
  const sortedKeys = Object.keys(products)
    .sort((a, b) => products[b] - products[a])
    .splice(0, 4);

  const top5products = [];
  sortedKeys.forEach((key) => {
    top5products.push({ code: key, quantity: products[key] });
  });

  return top5products;
};

const Overview = ({ SAFT }) => {
  const top5Products = getTop5SoldProducts(SAFT.sourceDocuments.invoices);

  console.log(top5Products);

  return (
    <Segment>
      <Select placeholder="Select time" options={options} style={selectStyle} />
      <Divider />
      <Grid stackable>
        <Grid.Row columns={5}>
          <Grid.Column>
            <GrowthSegment text="Liquidity" number="100%" isNegative />
          </Grid.Column>
          <Grid.Column>
            <GrowthSegment text="Total Sales" number="100%" />
          </Grid.Column>
          <Grid.Column>
            <GrowthSegment text="Total Purchases" number="100%" isNegative />
          </Grid.Column>
          <Grid.Column>
            <GrowthSegment text="Gross Profit" number="100%" />
          </Grid.Column>
          <Grid.Column>
            <GrowthSegment text="Total Stock Value" number="100%" isNegative />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment compact>
              <Header>Most valuable costumers</Header>
              <BarChart
                width={600}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment compact>
              <Header>Best seller product</Header>
              <PieChart width={400} height={300}>
                <Pie data={top5Products} dataKey="quantity" nameKey="code" label>
                  {data.map((entry, index) => (
                    <Cell key="index" fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

Overview.propTypes = {
  SAFT: PropTypes.object.isRequired,
};

export default Overview;
