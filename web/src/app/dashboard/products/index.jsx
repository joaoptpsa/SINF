import React from 'react';
import {
  Grid, Input, Segment, List, Header, Icon, Label,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import GrowthSegment from '../growthSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';
import MostValuableCostumersSegment from '../mostValuableCostumersSegment';
import ProductsTable from './productsTable';
import dashboardPage from '../dashboardPage';
import MostUrgentBuysList from './mostUrgentBuys';

class Products extends React.Component {
  state = { text: '' };

  changeText = (e, data) => {
    this.setState({ text: data.value });

    console.log(data.value);
  };

  render() {
    const {
      SAFT, numSales, grossProfit, top5Costumers, top5Products, numCostumers,
    } = this.props;

    const { text } = this.state;

    return (
      <Grid stackable>
        <Grid.Row columns={4}>
          <Grid.Column>
            <GrowthSegment text="Stock value" number={100} />
          </Grid.Column>
          <Grid.Column>
            <GrowthSegment text="Total items" number={100} />
          </Grid.Column>
          <Grid.Column>
            <GrowthSegment text="Stock growth" number={100} />
          </Grid.Column>
          <Grid.Column>
            <GrowthSegment text="Out of stock items" number={100} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <MostValuableCostumersSegment top5Costumers={top5Costumers} />
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
