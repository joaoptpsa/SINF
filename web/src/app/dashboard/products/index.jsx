import React from 'react';
import {
  Grid, List, Segment, Header, Icon, Label,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import GrowthSegment from '../growthSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';
import MostValuableCostumersSegment from '../mostValuableCostumersSegment';
import dashboardPage from '../dashboardPage';

const Products = (props) => {
  const {
    SAFT, numSales, grossProfit, top5Costumers, top5Products, numCostumers,
  } = props;

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
          <MostValuableCostumersSegment top5Costumers={top5Costumers} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment style={{ height: '100%' }}>
            <Header as="h5" textAlign="center" style={{ margin: 'auto', width: '50%' }}>
              <Icon size="small" name="bell" circular />
              <Header.Content>Most Urgent Buys</Header.Content>
            </Header>
            <List divided verticalAlign="middle">
              <List.Item>
                <List.Content floated="left">Chips</List.Content>
                <List.Content floated="right">
                  <Label color="blue">17</Label>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content floated="left">Chips</List.Content>
                <List.Content floated="right">
                  <Label color="blue">17</Label>
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Products.propTypes = {
  SAFT: PropTypes.object.isRequired,
};

export default dashboardPage(Products);
