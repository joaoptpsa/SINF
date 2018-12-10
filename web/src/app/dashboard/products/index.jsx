import React from 'react';
import {
  Grid, Segment, Header, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { dbQuery } from 'primavera-web-api';

import DisplaySegment from '../displaySegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';
import ProductsTable from './productsTable';
import dashboardPage from '../dashboardPage';
import MostUrgentBuysList from './mostUrgentBuys';

class Products extends React.Component {
  state = {
    loadingDb: true,
    numberOfStockedItems: 0,
    numberOfOutOfStockItems: 0,
    top5StockedItems: [],
    itemsList: [],
  };

  componentDidMount() {
    const { companyName } = this.props;
    this.loadDB(companyName);
  }

  loadDB = async (companyName) => {
    // loading started
    const urgentBuys = await dbQuery('SELECT * FROM NecessidadesCompras');
    const urgentBuysJson = await urgentBuys.json();
    console.log(urgentBuysJson);

    const itemsStockResult = await dbQuery(
      'SELECT DISTINCT Artigo.Artigo, Artigo.Descricao, V_INV_ValoresActuaisStock.Stock , ArtigoMoeda.PVP1 FROM Artigo INNER JOIN V_INV_ValoresActuaisStock ON Artigo.Artigo = V_INV_ValoresActuaisStock.Artigo INNER JOIN ArtigoMoeda ON Artigo.Artigo = ArtigoMoeda.Artigo',
    );

    const itemsStockJson = await itemsStockResult.json();
    this.getNumberOfStockedItems(itemsStockJson.DataSet.Table);
    this.getNumberOfOutOfStockItems(itemsStockJson.DataSet.Table);
    this.getTop5StockedItems(itemsStockJson.DataSet.Table);
    this.getItemsListArray(itemsStockJson.DataSet.Table);

    this.setState({ loadingDb: false });
  };

  getNumberOfStockedItems = (itemsTable) => {
    let { numberOfStockedItems } = this.state;
    itemsTable.forEach((item) => {
      numberOfStockedItems += item.Stock;
    });

    this.setState({ numberOfStockedItems });
  };

  getNumberOfOutOfStockItems = (itemsTable) => {
    let { numberOfOutOfStockItems } = this.state;
    itemsTable.forEach((item) => {
      if (item.Stock === 0) {
        numberOfOutOfStockItems += 1;
      }
    });

    this.setState({ numberOfOutOfStockItems });
  };

  getTop5StockedItems = (itemsTableJson) => {
    const sortedItemsJson = itemsTableJson.sort((a, b) => b.Stock - a.Stock);
    const top5SortedItemsJson = sortedItemsJson.splice(0, 5); // sort in ascending order

    const top5StockedItemsArray = [];
    top5SortedItemsJson.forEach((item) => {
      top5StockedItemsArray.push({
        quantity: item.Stock,
        code: item.Artigo,
        description: item.Descricao,
      });
    });

    this.setState({ top5StockedItems: top5StockedItemsArray });
  };

  getItemsListArray = (itemsTableJson) => {
    const itemsListArray = [];
    itemsTableJson.forEach((item) => {
      itemsListArray.push({ ...item });
    });

    this.setState({ itemsList: itemsListArray });
  };

  render() {
    const {
      loadingDb,
      numberOfStockedItems,
      numberOfOutOfStockItems,
      top5StockedItems,
      itemsList,
    } = this.state;

    console.log(itemsList);

    return (
      <Grid stackable>
        <Grid.Row columns={3}>
          <Grid.Column>
            <DisplaySegment
              text="Total Inventory value"
              loading={loadingDb}
              number={100}
              type="€"
            />
          </Grid.Column>
          <Grid.Column>
            <DisplaySegment
              text="Total items"
              loading={loadingDb}
              number={numberOfStockedItems}
              type=""
            />
          </Grid.Column>
          <Grid.Column>
            <DisplaySegment
              text="Out of stock items"
              loading={loadingDb}
              number={numberOfOutOfStockItems}
              type=""
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <ProductsTable itemsList={itemsList} />
          </Grid.Column>
          <Grid.Column width={6}>
            <TopProductsPiechartSegment
              title="Top stocked products"
              top5Products={top5StockedItems}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={10} />
          <Grid.Column width={6}>
            <Segment style={{ height: '100%' }}>
              <Header as="h5" textAlign="center" style={{ margin: 'auto', width: '50%' }}>
                <Icon size="small" name="bell" circular />
                <Header.Content>Most Urgent Buys</Header.Content>
              </Header>
              <MostUrgentBuysList />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Products.defaultProps = {
  companyName: 'DEMO',
};

Products.propTypes = {
  SAFT: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  companyName: PropTypes.string,
  getNumCustomers: PropTypes.func.isRequired,
  getNetTotalFromInvoices: PropTypes.func.isRequired,
  top5Products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  getNumSales: PropTypes.func.isRequired,
};

export default dashboardPage(Products);
