import React from 'react';
import {
  Grid, Menu, Container, Header, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Overview from './overview';

const menuItemStyle = {
  color: 'gray',
};

const Dashboard = ({ SAFT }) => (
  <Container fluid style={{ height: '100%' }}>
    <Router>
      <Grid columns={2} style={{ minHeight: '100%' }} stackable>
        <Grid.Column
          width={2}
          style={{ backgroundColor: '#504249', minHeight: '100%', padding: '33px' }}
        >
          <Header style={{ color: 'white' }}>
            <Icon name="dashboard" />
            360 Company Dashboard
          </Header>
          <Menu text vertical>
            <Menu.Item name="Overview" style={menuItemStyle}>
              <Link to="/">Overview</Link>
            </Menu.Item>
            <Menu.Item name="Sales" style={menuItemStyle}>
              <Link to="/sales/">Sales</Link>
            </Menu.Item>
            <Menu.Item name="Purchases" style={menuItemStyle} />
            <Menu.Item name="Inventory" style={menuItemStyle} />
            <Menu.Item name="Finances" style={menuItemStyle}>
              <Link to="/finances/">Finances</Link>
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column
          width={14}
          style={{ backgroundColor: '#D8D8D8', paddingTop: '30px', paddingRight: '30px' }}
        >
          {/* Overview page */}
          <Route path="/" exact render={props => <Overview SAFT={SAFT} {...props} />} />
          {/* Sales page */}
          <Route path="/sales/" component={null} />
          {/* */}
        </Grid.Column>
      </Grid>
    </Router>
  </Container>
);

Dashboard.propTypes = {
  SAFT: PropTypes.object.isRequired,
};

export default Dashboard;