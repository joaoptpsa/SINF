import React from 'react';
import {
  Grid, Input, Segment, Header, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getToken, dbQuery } from 'primavera-web-api';

import DisplaySegment from '../displaySegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';
import ProductsTable from './productsTable';
import dashboardPage from '../dashboardPage';
import MostUrgentBuysList from './mostUrgentBuys';
import MonthlyProductsChart from './monthlyProductsChart';

class Products extends React.Component {
  state = { text: '', loadingDb: true, numberOfStockedItems: null };

  constructor(props) {
    super(props);
    const { companyName } = props;

    this.loadDB(companyName);
  }

  loadDB = async (companyName) => {
    await getToken(companyName);

    // loading started
    const urgentBuys = await dbQuery('SELECT * FROM NecessidadesCompras');
    const urgentBuysJson = await urgentBuys.json();
    console.log(urgentBuysJson);

    const itemsResult = await dbQuery(
      'SELECT Artigo, Armazem, ISNULL(StkActual, 0) AS StkActual FROM V_INV_ArtigoArmazem',
    );
    const rawJson = await itemsResult.json();
    console.log(rawJson.DataSet.Table);
    this.getNumberOfStockedItems(rawJson.DataSet.Table);

    // loading ended
    this.setState({ loadingDb: false });
  };

  getNumberOfStockedItems = (items) => {
    let numberOfStockedItems = 0;
    items.forEach((item) => {
      numberOfStockedItems += item.StkActual;
    });

    this.setState({ numberOfStockedItems });
  };

  changeText = (e, data) => {
    this.setState({ text: data.value });

    console.log(data.value);
  };

  render() {
    const {
      SAFT,
      top5Products,
      getNumSales,
      getNumCustomers,
      getNetTotalFromInvoices,
    } = this.props;

    const { text, loadingDb, numberOfStockedItems } = this.state;

    if (loadingDb) {
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
              <DisplaySegment text="Total items" loading={loadingDb} number={0} type="" />
            </Grid.Column>
            <Grid.Column>
              <DisplaySegment text="Out of stock items" number={100} type="" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={10}>
              <MonthlyProductsChart
                invoices={SAFT.sourceDocuments.invoices}
                getNumSales={getNumSales}
                getNumCustomers={getNumCustomers}
                getNetTotalFromInvoices={getNetTotalFromInvoices}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <TopProductsPiechartSegment
                title="Top stocked products"
                top5Products={top5Products}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={10}>
              <Segment>
                <Grid.Row>
                  <Input
                    action="Search"
                    placeholder="Search..."
                    fluid
                    onChange={this.changeText}
                    value={text}
                  />
                  <ProductsTable />
                </Grid.Row>
              </Segment>
            </Grid.Column>
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
            <DisplaySegment text="Out of stock items" number={100} type="" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <MonthlyProductsChart
              invoices={SAFT.sourceDocuments.invoices}
              getNumSales={getNumSales}
              getNumCustomers={getNumCustomers}
              getNetTotalFromInvoices={getNetTotalFromInvoices}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <TopProductsPiechartSegment title="Top stocked products" top5Products={top5Products} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <Segment>
              <Grid.Row>
                <Input
                  action="Search"
                  placeholder="Search..."
                  fluid
                  onChange={this.changeText}
                  value={text}
                />
                <ProductsTable />
              </Grid.Row>
            </Segment>
          </Grid.Column>
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
