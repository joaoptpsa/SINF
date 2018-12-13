import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { dbQuery } from 'primavera-web-api';

import dashboardPage from '../dashboardPage';
import DisplaySegment from '../displaySegment';
import BarChartSegment from '../barChartSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';
import MonthlyPurchasesChart from './monthlyPurchasesChart';

class Purchases extends React.Component {
  state = {
    loadingDb: true,
    noTotalPurchases: 0,
    totalPurchasesValue: 0,
    top5Suppliers: [],
  };

  componentDidMount() {
    this.loadDB();
  }

  loadDB = async () => {
    const buyOrders = await dbQuery(
      "SELECT CC.Entidade, F.Nome, CC.DataDoc, CC.TotalMerc, CCS.Estado FROM CabecCompras CC INNER JOIN CabecComprasStatus CCS ON CCS.IdCabecCompras = CC.Id INNER JOIN Fornecedores F ON CC.Entidade = F.Fornecedor WHERE CC.TipoDoc = 'ECF'",
    );
    const buyOrdersJson = await buyOrders.json();
    this.getNoTotalPurchases(buyOrdersJson.DataSet.Table);
    this.getTotalPurchasesValue(buyOrdersJson.DataSet.Table);

    const totalBuyOrdersBySupplier = await dbQuery(
      "SELECT CC.Entidade, F.Nome, SUM(CC.TotalMerc) TotalCompras FROM CabecCompras CC INNER JOIN CabecComprasStatus CCS ON CCS.IdCabecCompras = CC.Id INNER JOIN Fornecedores F ON CC.Entidade = F.Fornecedor WHERE CC.TipoDoc = 'ECF' GROUP BY CC.Entidade, F.Nome",
    );
    const totalBuyOrdersBySupplierJson = await totalBuyOrdersBySupplier.json();

    this.getTop5Suppliers(totalBuyOrdersBySupplierJson.DataSet.Table);

    this.setState({ loadingDb: false });
  };

  getNoTotalPurchases = (buyOrdersJson) => {
    this.setState({ noTotalPurchases: buyOrdersJson.length });
  };

  getTotalPurchasesValue = (buyOrdersJson) => {
    let totalPurchasesValue = 0;
    buyOrdersJson.forEach((buyOrder) => {
      totalPurchasesValue += buyOrder.TotalMerc;
    });

    this.setState({ totalPurchasesValue });
  };

  getTop5Suppliers = (totalBuyOrdersBySupplierJson) => {
    const sortedSuppliersJson = totalBuyOrdersBySupplierJson.sort(
      (a, b) => a.TotalCompras - b.TotalCompras,
    );
    const top5SortedSuppliersJson = sortedSuppliersJson.splice(0, 5);

    const top5SuppliersArray = [];
    top5SortedSuppliersJson.forEach((supplier) => {
      top5SuppliersArray.push({
        name: supplier.Nome,
        quantity: supplier.TotalCompras,
      });
    });

    this.setState({ top5Suppliers: top5SuppliersArray });
  };

  render() {
    const {
      SAFT,
      numSuppliers,
      top5Products,
      getNumSales,
      getNumCustomers,
      getNetTotalFromInvoices,
    } = this.props;

    const {
      loadingDb, noTotalPurchases, totalPurchasesValue, top5Suppliers,
    } = this.state;

    return (
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column>
            <DisplaySegment
              text="Total Purchases"
              loading={loadingDb}
              number={totalPurchasesValue}
              type="€"
            />
          </Grid.Column>
          <Grid.Column>
            <DisplaySegment
              text="Number of purchases"
              loading={loadingDb}
              number={noTotalPurchases}
              type=""
            />
          </Grid.Column>
          <Grid.Column>
            <DisplaySegment text="Number of suppliers" number={numSuppliers} type="" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <TopProductsPiechartSegment title="Spending by Category" top5Products={top5Products} />
          </Grid.Column>
          <Grid.Column width={10}>
            <BarChartSegment
              title="Most Valuable Suppliers"
              infArray={top5Suppliers}
              xAxisDataKey="name"
              barDataKey="quantity"
              barDataDescription="Purchased"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <MonthlyPurchasesChart
              invoices={SAFT.sourceDocuments.invoices}
              getNumSales={getNumSales}
              getNumCustomers={getNumCustomers}
              getNetTotalFromInvoices={getNetTotalFromInvoices}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Purchases.propTypes = {
  SAFT: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  top5Costumers: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  top5Products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  numSuppliers: PropTypes.number.isRequired,
  getNumSales: PropTypes.func.isRequired,
  getNumCustomers: PropTypes.func.isRequired,
  getNetTotalFromInvoices: PropTypes.func.isRequired,
};

export default dashboardPage(Purchases);
