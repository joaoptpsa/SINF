import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { dbQuery } from 'primavera-web-api';

import dashboardPage from '../dashboardPage';
import DisplaySegment from '../displaySegment';
import MostValuableCostumersSegment from './mostValuableCostumersSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';
import MonthlyPurchasesChart from './monthlyPurchasesChart';

class Purchases extends React.Component {
  state = {
    loadingDb: true,
    noTotalPurchases: 0,
    totalPurchasesValue: 0,
  };

  componentDidMount() {
    this.loadDB();
  }

  loadDB = async () => {
    const buyOrders = await dbQuery(
      "SELECT CC.Entidade, CC.TotalMerc, CCS.Estado FROM CabecCompras CC INNER JOIN CabecComprasStatus CCS ON CCS.IdCabecCompras = CC.Id WHERE CC.TipoDoc = 'ECF'",
    );
    const buyOrdersJson = await buyOrders.json();
    this.getNoTotalPurchases(buyOrdersJson.DataSet.Table);
    this.getTotalPurchasesValue(buyOrdersJson.DataSet.Table);

    this.setState({ loadingDb: false });
  };

  getNoTotalPurchases = (buyOrdersJson) => {
    this.setState({ noTotalPurchases: buyOrdersJson.length });
  };

  getTotalPurchasesValue = (buyOrdersJson) => {
    const totalPurchasesValue = 0;
    buyOrdersJson.forEach((buyOrder) => {
      totalPurchasesValue += buyOrder.TotalMerc;
    });

    this.setState({ totalPurchasesValue });
  };

  render() {
    const {
      SAFT,
      numSuppliers,
      top5Products,
      top5Costumers,
      getNumSales,
      getNumCustomers,
      getNetTotalFromInvoices,
    } = this.props;

    const { loadingDb, noTotalPurchases, totalPurchasesValue } = this.state;

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
            <TopProductsPiechartSegment title="Top items bought" top5Products={top5Products} />
          </Grid.Column>
          <Grid.Column width={10}>
            <MostValuableCostumersSegment top5Costumers={top5Costumers} />
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
          <Grid.Column width={6}>
            <TopProductsPiechartSegment title="Spending by item" top5Products={top5Products} />
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
