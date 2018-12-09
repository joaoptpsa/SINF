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
  state = { text: '' };

  constructor(props) {
    super(props);

    const { companyName } = this.props;

    this.loadDB(companyName);
  }

  changeText = (e, data) => {
    this.setState({ text: data.value });

    console.log(data.value);
  };

  loadDB = async (companyName) => {
    await getToken(companyName);

    // loading started
    const result = await dbQuery('SELECT * FROM V_INV_ArtigoArmazem');
    const resultJson = await result.json();
    console.log(resultJson);
    // other queries

    // loading ended
  };

  render() {
    const {
      SAFT,
      top5Products,
      getNumSales,
      getNumCustomers,
      getNetTotalFromInvoices,
    } = this.props;

    const { text } = this.state;

    return (
      <Grid stackable>
        <Grid.Row columns={3}>
          <Grid.Column>
            <DisplaySegment text="Total Inventory value" number={100} type="€" />
          </Grid.Column>
          <Grid.Column>
            <DisplaySegment text="Total items" number={100} type="" />
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
