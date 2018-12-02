import React from 'react';
import {
  Grid, Input, Segment, Header, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import GrowthSegment from '../growthSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';
import ProductsTable from './productsTable';
import dashboardPage from '../dashboardPage';
import MostUrgentBuysList from './mostUrgentBuys';
import MonthlyProductsChart from './monthlyProductsChart';

class Products extends React.Component {
  state = { text: '' };

  changeText = (e, data) => {
    this.setState({ text: data.value });

    console.log(data.value);
  };

  render() {
    const {
      SAFT,
      top5Products,
      getNumSales,
      getNumCostumers,
      getNetTotalFromInvoices,
    } = this.props;

    const { text } = this.state;

    return (
      <Grid stackable>
        <Grid.Row columns={3}>
          <Grid.Column>
            <GrowthSegment text="Total Inventory value" number={100} />
          </Grid.Column>
          <Grid.Column>
            <GrowthSegment text="Total items" number={100} />
          </Grid.Column>
          <Grid.Column>
            <GrowthSegment text="Out of stock items" number={100} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <MonthlyProductsChart
              invoices={SAFT.sourceDocuments.invoices}
              getNumSales={getNumSales}
              getNumCostumers={getNumCostumers}
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

Products.propTypes = {
  SAFT: PropTypes.object.isRequired,
};

export default dashboardPage(Products);
