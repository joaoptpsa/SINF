import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { dbQuery } from 'primavera-web-api';

import DisplaySegment from '../displaySegment';
import TopStockedProductsPiechartSegment from './topStockedProductsPiechartSegment';
import ProductsTable from './productsTable';
import dashboardPage, { InjectedProps } from '../dashboardPage';
import MostUrgentBuysList from './mostUrgentBuys';

class Products extends React.Component {
  state = {
    loadingDb: true,
    totalInventoryValue: 0,
    numberOfStockedItems: 0,
    numberOfOutOfStockItems: 0,
    itemsList: [],
  };

  componentDidMount() {
    this.loadDB();
  }

  loadDB = async () => {
    // loading started

    const itemsStockResult = await dbQuery(
      'SELECT DISTINCT Artigo.Artigo, Artigo.Descricao, V_INV_ValoresActuaisStock.Stock , ArtigoMoeda.PVP1 FROM Artigo INNER JOIN V_INV_ValoresActuaisStock ON Artigo.Artigo = V_INV_ValoresActuaisStock.Artigo INNER JOIN ArtigoMoeda ON Artigo.Artigo = ArtigoMoeda.Artigo',
    );

    this.getNumberOfStockedItems(itemsStockResult.DataSet.Table);
    this.getNumberOfOutOfStockItems(itemsStockResult.DataSet.Table);
    this.getItemsListArray(itemsStockResult.DataSet.Table);

    const itemsBuyPrice = await dbQuery(
      'SELECT AF.Artigo, AVG(AF.PrCustoUltimo) AS Custo FROM ArtigoFornecedor AF GROUP BY AF.Artigo',
    );

    this.getTotalInventoryValue(itemsBuyPrice.DataSet.Table, itemsBuyPrice.DataSet.Table);

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

  getItemsListArray = (itemsTableJson) => {
    const itemsListArray = [];
    itemsTableJson.forEach((item) => {
      itemsListArray.push({ ...item });
    });

    this.setState({ itemsList: itemsListArray });
  };

  getCostForItem = (Artigo, itemsBuyPriceJson) => {
    let itemCost = 0;
    itemsBuyPriceJson.forEach((item) => {
      if (item.Artigo === Artigo) {
        itemCost = item.Custo;
      }
    });

    return itemCost;
  };

  getTotalInventoryValue = (itemsStockJson, itemsBuyPriceJson) => {
    let totalInventoryValue = 0;
    itemsStockJson.forEach((item) => {
      const itemCost = this.getCostForItem(item.Artigo, itemsBuyPriceJson);
      totalInventoryValue += item.Stock * itemCost;
    });

    this.setState({ totalInventoryValue });
  };

  render() {
    const {
      loadingDb,
      totalInventoryValue,
      numberOfStockedItems,
      numberOfOutOfStockItems,
      itemsList,
    } = this.state;

    return (
      <Grid stackable>
        <Grid.Row columns={3}>
          <Grid.Column>
            <DisplaySegment
              text="Total Inventory value"
              loading={loadingDb}
              number={totalInventoryValue}
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
                  <TopStockedProductsPiechartSegment />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column width={16}>
                  <MostUrgentBuysList />
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
  ...InjectedProps,
};

export default dashboardPage(Products);
