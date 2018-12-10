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
    urgentBuysList: [],
    numberOfStockedItems: 0,
    numberOfOutOfStockItems: 0,
    top5StockedItems: [],
    itemsList: [],
  };

  componentDidMount() {
    this.loadDB();
  }

  loadDB = async () => {
    // loading started
    const urgentBuys = await dbQuery(
      'SELECT DISTINCT Artigo.Artigo, Artigo.Descricao, NecessidadesCompras.Quantidade FROM NecessidadesCompras INNER JOIN Artigo ON Artigo.Artigo = NecessidadesCompras.Artigo',
    );
    const urgentBuysJson = await urgentBuys.json();
    this.getUrgentBuysArray(urgentBuysJson.DataSet.Table);

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

  getUrgentBuysArray = (urgentBuysTableJson) => {
    const urgentBuysArray = [];
    urgentBuysTableJson.forEach((item) => {
      urgentBuysArray.push({ ...item });
    });

    this.setState({ urgentBuysList: urgentBuysArray });
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
      urgentBuysList,
      numberOfStockedItems,
      numberOfOutOfStockItems,
      top5StockedItems,
      itemsList,
    } = this.state;

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
          <Grid.Column width={10} height={300}>
            <ProductsTable itemsList={itemsList} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column width={16}>
                  <TopProductsPiechartSegment
                    title="Top stocked products"
                    top5Products={top5StockedItems}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column width={16}>
                  <MostUrgentBuysList urgentBuysList={urgentBuysList} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
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
