import React from 'react';
import {
  Segment, List, Label, Header, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class MostUrgentBuysList extends React.Component {
  state = { urgentBuysList: [] };

  componentWillReceiveProps(nextProps) {
    this.setState({ urgentBuysList: nextProps.urgentBuysList });
  }

  renderList = () => {
    const items = [];
    const { urgentBuysList } = this.state;

    if (urgentBuysList.length === 0) {
      return (
        <List.Item>
          <Header icon>
            <Icon color="red" name="fire" />
            No urgent buys at the moment!
          </Header>
        </List.Item>
      );
    }

    urgentBuysList.forEach((urgentBuy) => {
      let color = 'blue';
      if (urgentBuy.Quantidade < 50) {
        color = 'orange';
      } else if (urgentBuy.Quantidade < 10) {
        color = 'red';
      }

      const item = (
        <List.Item key={urgentBuy.Artigo}>
          <List.Content floated="left">{urgentBuy.Descricao}</List.Content>
          <List.Content floated="right">
            <Label color={color}>{urgentBuy.Quantidade}</Label>
          </List.Content>
        </List.Item>
      );
      items.push(item);
    });

    return items;
  };

  render() {
    return (
      <Segment style={{ height: '100%' }}>
        <Header as="h5" textAlign="center" style={{ margin: 'auto', width: '50%' }}>
          <Icon size="small" name="bell" circular />
          <Header.Content>Most Urgent Buys</Header.Content>
        </Header>
        <List divided verticalAlign="middle">
          {this.renderList()}
        </List>
      </Segment>
    );
  }
}

MostUrgentBuysList.propTypes = {
  urgentBuysList: PropTypes.array.isRequired,
};

export default MostUrgentBuysList;
