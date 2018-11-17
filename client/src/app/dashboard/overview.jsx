import React from 'react';
import {
  Divider, Select, Grid, Segment, Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const options = [{
  key: 'lastMonth', value: 'lastMonth', text: 'Last month',
}, {
  key: 'lastSemester', value: 'lastSemester', text: 'Last semester',
}];

const selectStyle = {
  backgroundColor: 'transparent',
  color: 'black',
};

const GrowthSegment = ({ text, number }) => (
  <Segment textAlign="center">
    <Header>{text}</Header>
    {number}
  </Segment>
);

GrowthSegment.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

const Overview = () => (
  <div>
    <Select placeholder="Select time" options={options} style={selectStyle} />
    <Divider />
    <Grid>
      <Grid.Row columns={5}>
        <Grid.Column>
          <GrowthSegment text="Liquidity" number="100%" />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Total Sales" number="100%" />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Total Purchases" number="100%" />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Gross Profit" number="100%" />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Total Stock Value" number="100%" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default Overview;
