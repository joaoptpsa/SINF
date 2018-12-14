import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getNoPurchases, getTotalPurchasesCost } from 'primavera-web-api';

import dashboardPage from '../dashboardPage';
import DisplaySegment from '../displaySegment';
import BarChartSegment from '../barChartSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';
import MonthlyPurchasesChart from './monthlyPurchasesChart';

class Purchases extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noTotalPurchases: getNoPurchases(),
      totalPurchasesCost: getTotalPurchasesCost(),
    };
  }

  // loadDB = async () => {
  //   const buyOrders = await dbQuery(
  //     "SELECT CC.Entidade, F.Nome, CC.DataDoc, CC.TotalMerc, CCS.Estado FROM CabecCompras CC INNER JOIN CabecComprasStatus CCS ON CCS.IdCabecCompras = CC.Id INNER JOIN Fornecedores F ON CC.Entidade = F.Fornecedor WHERE CC.TipoDoc = 'ECF'",
  //   );

  //   this.getNoTotalPurchases(buyOrders.DataSet.Table);
  //   this.getTotalPurchasesValue(buyOrders.DataSet.Table);
  //   // TODO: monthlyChart for purchases

  //   const totalBuyOrdersBySupplier = await dbQuery(
  //     "SELECT CC.Entidade, F.Nome, SUM(CC.TotalMerc) TotalCompras FROM CabecCompras CC INNER JOIN CabecComprasStatus CCS ON CCS.IdCabecCompras = CC.Id INNER JOIN Fornecedores F ON CC.Entidade = F.Fornecedor WHERE CC.TipoDoc = 'ECF' GROUP BY CC.Entidade, F.Nome",
  //   );

  //   this.getTop5Suppliers(totalBuyOrdersBySupplier.DataSet.Table);
  // };

  render() {
    const {
      SAFT,
      numSuppliers,
      top5Products,
      getNumSales,
      getNumCustomers,
      getNetTotalFromInvoices,
    } = this.props;

    const { noTotalPurchases, totalPurchasesCost, top5Suppliers } = this.state;

    return (
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column>
            <DisplaySegment text="Total Purchases" number={totalPurchasesCost} type="€" />
          </Grid.Column>
          <Grid.Column>
            <DisplaySegment text="Number of purchases" number={noTotalPurchases} type="" />
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
