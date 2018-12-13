import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DisplaySegment from '../displaySegment';
import dashboardPage from '../dashboardPage';
import BarChartSegment from '../barChartSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';

const Overview = (props) => {
  const { netTotal, top5Costumers, top5Products } = props;

  return (
    <Grid stackable>
      <Grid.Row columns={4}>
        <Grid.Column>
          <DisplaySegment text="Net Sales" number={netTotal} type="€" />
        </Grid.Column>
        <Grid.Column>
          <DisplaySegment text="Total Purchases" number={100} type="€" />
        </Grid.Column>
        <Grid.Column>
          <DisplaySegment text="Total Inventory Value" number={100} type="€" />
        </Grid.Column>
        <Grid.Column>
          <DisplaySegment text="Quick ratio" number={100} type="%" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={10}>
          <BarChartSegment title="Most Valuable Costumers" infArray={top5Costumers} />
        </Grid.Column>
        <Grid.Column width={6}>
          <TopProductsPiechartSegment title="Best seller products" top5Products={top5Products} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Overview.propTypes = {
  SAFT: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  netTotal: PropTypes.number.isRequired,
  top5Costumers: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  top5Products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default dashboardPage(Overview);
