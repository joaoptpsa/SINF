import React from 'react';
import { Table, Input, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// TODO: Proptypes
class ProductsTable extends React.Component {
  state = { text: '', itemsList: [] };

  componentWillReceiveProps(nextProps) {
    this.setState({ itemsList: nextProps.itemsList });
  }

  changeText = (e, data) => {
    this.setState({ text: data.value });
  };

  renderTable = () => {
    const rows = [];
    const { itemsList } = this.state;

    itemsList.forEach((item) => {
      const element = (
        <Table.Row key={item.Artigo}>
          <Table.Cell>{item.Artigo}</Table.Cell>
          <Table.Cell>{item.Descricao}</Table.Cell>
          <Table.Cell>{item.Stock}</Table.Cell>
          <Table.Cell>{item.PVP1}</Table.Cell>
        </Table.Row>
      );
      rows.push(element);
    });

    return rows;
  };

  render() {
    const { text } = this.state;

    return (
      <Segment>
        <Input
          action="Search"
          placeholder="Search..."
          fluid
          onChange={this.changeText}
          value={text}
        />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Total Stock</Table.HeaderCell>
              <Table.HeaderCell>PVP</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.renderTable()}</Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default ProductsTable;
