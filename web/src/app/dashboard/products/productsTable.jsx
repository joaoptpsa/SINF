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
        <Table celled sortable>
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
