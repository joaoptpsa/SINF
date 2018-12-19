import React from 'react';
import { Table, Input, Segment } from 'semantic-ui-react';
import { getProductsInformation } from 'primavera-web-api';

class ProductsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { text: '', productsInformationArray: getProductsInformation() };
  }

  changeText = (e, data) => {
    const { productsInformationArray } = this.state;
    const text = data.value;

    this.setState({ text });

    if (text !== '') {
      const regexp = new RegExp(`.*${text}.*`, 'i');

      const newArray = productsInformationArray.filter(value => value.Descricao.match(regexp));

      this.setState({ productsInformationArray: newArray });
    } else {
      this.setState({ productsInformationArray: getProductsInformation() });
    }
  };

  renderTable = () => {
    const rows = [];
    const { productsInformationArray } = this.state;

    productsInformationArray.forEach((product) => {
      const element = (
        <Table.Row key={product.Artigo}>
          <Table.Cell>{product.Artigo}</Table.Cell>
          <Table.Cell>{product.Descricao}</Table.Cell>
          <Table.Cell>{product.Stock}</Table.Cell>
          <Table.Cell>{product.PVP1}</Table.Cell>
        </Table.Row>
      );
      rows.push(element);
    });

    return rows;
  };

  handleSort = clickedColumn => () => {
    const { column, productsInformationArray, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        productsInformationArray: productsInformationArray.sort(
          (a, b) => a[clickedColumn] < b[clickedColumn],
        ),
        direction: 'ascending',
      });
    }

    this.setState({
      productsInformationArray: productsInformationArray.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  render() {
    const { text, column, direction } = this.state;

    return (
      <Segment>
        <Input
          action="Search"
          placeholder="Search..."
          fluid
          onChange={this.changeText}
          value={text}
        />
        <Table celled sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Descricao' ? direction : null}
                onClick={this.handleSort('Descricao')}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Stock' ? direction : null}
                onClick={this.handleSort('Stock')}
              >
                Total Stock
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'PVP1' ? direction : null}
                onClick={this.handleSort('PVP1')}
              >
                PVP
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.renderTable()}</Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default ProductsTable;
