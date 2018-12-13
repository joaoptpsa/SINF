import React from 'react';
import { Segment, Header, Container } from 'semantic-ui-react';
import {
  ResponsiveContainer, PieChart, Pie, Legend, Cell,
} from 'recharts';
import { dbQuery } from 'primavera-web-api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4444'];

class TopStockedProductsPiechartSegment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingDb: true,
      top5StockedItems: [],
    };
  }

  componentDidMount() {
    this.loadDb();
  }

  loadDb = async () => {
    const itemsStockResult = await dbQuery(
      'SELECT DISTINCT Artigo.Artigo, Artigo.Descricao, V_INV_ValoresActuaisStock.Stock FROM Artigo INNER JOIN V_INV_ValoresActuaisStock ON Artigo.Artigo = V_INV_ValoresActuaisStock.Artigo',
    );
    const itemsStockJson = await itemsStockResult.json();
    this.getTop5StockedItems(itemsStockJson.DataSet.Table);

    this.setState({ loadingDb: false });
  };

  getTop5StockedItems = (itemsTableArray) => {
    const sortedStockedItemsArray = itemsTableArray.sort((a, b) => b.Stock - a.Stock); // sort in ascending order
    const top5StockedItemsArray = sortedStockedItemsArray.splice(0, 5);

    this.setState({ top5StockedItems: top5StockedItemsArray });
  };

  render() {
    const { loadingDb, top5StockedItems } = this.state;

    if (loadingDb) {
      return (
        <Segment loading>
          <Header>Top Stocked Products</Header>
          <ResponsiveContainer height={300} width="90%">
            <Container fluid />
          </ResponsiveContainer>
        </Segment>
      );
    }

    return (
      <Segment>
        <Header>Top Stocked Products</Header>
        <ResponsiveContainer height={300} width="90%">
          <PieChart>
            <Pie data={top5StockedItems} dataKey="Stock" nameKey="Descricao" label>
              {top5StockedItems.map((entry, index) => (
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
