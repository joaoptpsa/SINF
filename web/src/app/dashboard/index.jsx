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

const Dashboard = ({ SAFT, match, location }) => (
  <Container fluid style={{ height: '100%' }}>
    <Grid columns={2} stackable style={{ minHeight: '100%' }}>
      <Grid.Column width={3} style={{ padding: '25px' }}>
        <Header style={{ color: '#364f6b' }}>
          <Icon name="dashboard" />
          360 Company Dashboard
        </Header>
        <Menu pointing vertical>
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
        style={{
          paddingTop: '30px',
          paddingRight: '30px',
          paddingBottom: '30px',
        }}
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
    <Container
      fluid
      style={{
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        color: '#f5f5f5',
        backgroundColor: '#364f6b',
      }}
    >
      SINF 2018
    </Container>
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
