import React from 'react';
import { Table, Input, Segment } from 'semantic-ui-react';
import { dbQuery } from 'primavera-web-api';

class ProductsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loadingDb: true, text: '', itemsInformationArray: [] };
  }

  componentDidMount = () => {
    this.loadDb();
  };

  loadDb = async () => {
    const itemsInformationResult = await dbQuery(
      'SELECT DISTINCT Artigo.Artigo, Artigo.Descricao, V_INV_ValoresActuaisStock.Stock , ArtigoMoeda.PVP1 FROM Artigo INNER JOIN V_INV_ValoresActuaisStock ON Artigo.Artigo = V_INV_ValoresActuaisStock.Artigo INNER JOIN ArtigoMoeda ON Artigo.Artigo = ArtigoMoeda.Artigo',
    );
    const itemsInformationArray = await itemsInformationResult.json();
    this.setState({ itemsInformationArray: itemsInformationArray.DataSet.Table });

    this.setState({ loadingDb: false });
  };

  changeText = (e, data) => {
    this.setState({ text: data.value });
  };

  renderTable = () => {
    const rows = [];
    const { itemsInformationArray } = this.state;

    itemsInformationArray.forEach((item) => {
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
    const { loadingDb, text } = this.state;

    return (
      <Segment loading={loadingDb}>
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
