import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';
import { getTop5Suppliers } from 'primavera-web-api';

class BiggestSuppliersBarChartSegment extends React.Component {
  constructor(props) {
    super(props);

    this.state = { top5SuppliersArray: getTop5Suppliers() };
  }

  render() {
    const { top5SuppliersArray } = this.state;

    return (
      <Segment>
        <Header>Biggest Suppliers</Header>
        <ResponsiveContainer height={300} width="90%">
          <BarChart data={top5SuppliersArray}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Nome" interval="preserveStartEnd" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar name="Total Compras" dataKey="TotalCompras" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Segment>
    );
  }
}

export default BiggestSuppliersBarChartSegment;
