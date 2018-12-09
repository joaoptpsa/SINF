import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import PropTypes from 'prop-types';
import { Segment, Menu, Grid } from 'semantic-ui-react';

// const monthNames = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];

class MonthlyChart extends React.Component {
  constructor(props) {
    super(props);

    const { data, options } = props;

    this.state = { selectedOption: Object.keys(options)[0], selectedYear: Object.keys(data)[0] };
  }

  renderLine = () => {
    const { selectedOption } = this.state;
    const { options } = this.props;

    const selectedItem = options[selectedOption];

    return (
      <Line type="monotone" name={selectedItem.name} dataKey={selectedItem.key} stroke="#75cac3" />
    );
  };

  renderYearMenu = () => {
    const { selectedYear } = this.state;
    const { data } = this.props;
    const items = [];

    Object.keys(data).forEach((year) => {
      items.push(
        <Menu.Item
          key={`${year}`}
          name={`${year}`}
          active={selectedYear === year}
          onClick={() => this.setState({ selectedYear: year })}
        />,
      );
    });

    return <Menu>{items}</Menu>;
  };

  renderOptions = () => {
    const { options } = this.props;
    const { selectedOption } = this.state;

    const items = [];

    Object.keys(options).forEach((key) => {
      const item = options[key];

      items.push(
        <Menu.Item
          key={`${key}`}
          name={item.name}
          active={selectedOption === item.key}
          onClick={() => this.setState({ selectedOption: item.key })}
        />,
      );
    });

    return items;
  };

  render() {
    const { selectedYear } = this.state;
    const { data } = this.props;

    return (
      <Segment>
        {this.renderYearMenu()}
        <Grid columns={2}>
          <Grid.Column width={4}>
            <Menu vertical pointing>
              {this.renderOptions()}
            </Menu>
          </Grid.Column>
          <Grid.Column width={12}>
            <ResponsiveContainer height={300} width="100%">
              <LineChart data={[...data[selectedYear]]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {this.renderLine()}
              </LineChart>
            </ResponsiveContainer>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

MonthlyChart.propTypes = {
  options: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default MonthlyChart;
