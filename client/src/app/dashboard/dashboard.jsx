import React from 'react';
import {
  Grid, Menu, Segment, Container, Header, Icon,
} from 'semantic-ui-react';
import Overview from './overview';

const menuItemStyle = {
  color: 'gray',
};

const Dashboard = () => (
  <Container fluid>
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column width={2} style={{ backgroundColor: '#504249', minHeight: '100%', padding: '33px' }}>
          <Header style={{ color: 'white' }}>
            <Icon name="dashboard" />
              360 Company Dashboard
          </Header>
          <Menu text vertical>
            <Menu.Item name="Overview" style={menuItemStyle} />
            <Menu.Item name="Sales" style={menuItemStyle} />
            <Menu.Item name="Purchases" style={menuItemStyle} />
            <Menu.Item name="Inventory" style={menuItemStyle} />
            <Menu.Item name="Finances" style={menuItemStyle} />
          </Menu>
        </Grid.Column>
        <Grid.Column width={14} style={{ backgroundColor: '#D8D8D8', padding: '20px' }}>
          <Overview />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default Dashboard;
