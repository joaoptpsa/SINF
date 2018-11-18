import React from 'react';
import {
  Divider, Select, Grid, Segment, Header, Icon,
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

const GrowthSegment = ({ text, number, isNegative }) => (
  <Segment textAlign="center" style={{ margin: '16px' }}>
    <Header>{text}</Header>
    <Grid columns={2}>
      <Grid.Column>
        <Header as="h2" style={{ paddingTop: '5px' }}>{number}</Header>
      </Grid.Column>
      <Grid.Column>
        {isNegative ? <Icon size="big" color="red" name="arrow circle down" /> : <Icon size="big" color="green" name="arrow circle up" />}
      </Grid.Column>
    </Grid>
  </Segment>
);

GrowthSegment.defaultProps = {
  isNegative: false,
};

GrowthSegment.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  isNegative: PropTypes.bool,
};

const Overview = () => (
  <div>
    <Select placeholder="Select time" options={options} style={selectStyle} />
    <Divider />
    <Grid>
      <Grid.Row columns={5}>
        <Grid.Column>
          <GrowthSegment text="Liquidity" number="100%" isNegative />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Total Sales" number="100%" />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Total Purchases" number="100%" isNegative />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Gross Profit" number="100%" />
        </Grid.Column>
        <Grid.Column>
          <GrowthSegment text="Total Stock Value" number="100%" isNegative />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default Overview;
