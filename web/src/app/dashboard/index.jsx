import React from 'react';
import {
  Grid, Menu, Container, Header, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

import Overview from './overview';
import Sales from './sales';
import Purchases from './purchases';
import Products from './products';
import Finances from './finances';

const menuStyle = { backgroundColor: '#504249', minHeight: '100%', padding: '25px' }

const Dashboard = ({ SAFT, match, location }) => (
  <Container fluid style={{ height: '100%' }}>
    <Grid columns={2} style={{ minHeight: '100%' }} stackable>
      <Grid.Column
        width={3}
        style={menuStyle}
      >
        <Header style={{ color: 'white' }}>
          <Icon name="dashboard" />
          360 Company Dashboard
        </Header>
        <Menu secondary vertical>
          <Menu.Item
            name="Overview"
            active={match.isExact && location.pathname === '/'}
            as={Link}
            to="/"
          />
          <Menu.Item name="Sales" active={location.pathname === '/sales'} as={Link} to="/sales" />
          <Menu.Item
            name="Purchases"
            active={location.pathname === '/purchases'}
            as={Link}
            to="/purchases"
          />
          <Menu.Item
            name="Inventory"
            active={location.pathname === '/products'}
            as={Link}
            to="/products"
          />
          <Menu.Item
            name="Finances"
            active={location.pathname === '/finances'}
            as={Link}
            to="/finances"
          />
        </Menu>
      </Grid.Column>
      <Grid.Column
        width={13}
        style={{ backgroundColor: '#D8D8D8', paddingTop: '30px', paddingRight: '30px' }}
      >
        {/* Overview page */}
        <Route path="/" exact render={props => <Overview SAFT={SAFT} {...props} />} />
        {/* Sales page */}
        <Route path="/sales/" render={props => <Sales SAFT={SAFT} {...props} />} />
        {/* Puchases page */}
        <Route path="/purchases/" render={props => <Purchases SAFT={SAFT} {...props} />} />
        {/* Products page */}
        <Route path="/products/" render={props => <Products SAFT={SAFT} {...props} />} />
        {/* Finances page */}
        <Route path="/finances/" render={props => <Finances SAFT={SAFT} {...props} />} />
        {/* */}
      </Grid.Column>
    </Grid>
  </Container>
);

Dashboard.defaultProps = {
  companyName: 'Demo',
};

Dashboard.propTypes = {
  SAFT: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  companyName: PropTypes.string,
};

export default Dashboard;
