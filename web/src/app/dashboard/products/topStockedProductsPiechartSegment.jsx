import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import {
  ResponsiveContainer, PieChart, Pie, Legend, Cell,
} from 'recharts';
import { getProductsStock } from 'primavera-web-api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4444'];

class TopStockedProductsPiechartSegment extends React.Component {
  constructor(props) {
    super(props);

    const productsStockArray = getProductsStock();
    const top5StockedProducts = productsStockArray.sort((a, b) => b.Stock - a.Stock).splice(0, 5);

    this.state = { top5StockedProducts };
  }

  render() {
    const { top5StockedProducts } = this.state;

    return (
      <Segment>
        <Header>Top Stocked Products</Header>
        <ResponsiveContainer height={300} width="90%">
          <PieChart>
            <Pie data={top5StockedProducts} dataKey="Stock" nameKey="Descricao" label>
              {top5StockedProducts.map((entry, index) => (
                <Cell key={entry.Artigo} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Segment>
    );
  }
}

export default TopStockedProductsPiechartSegment;
