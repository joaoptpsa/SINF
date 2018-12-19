import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import DisplaySegment from '../displaySegment';

const getGeneralLedgerAccount = (SAFT, id) => {
  if (!SAFT.masterFiles.generalLedgerAccounts[`${id}`]) {
    return null;
  }

  const Account = {};
  Account.openingPeriod = Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts[`${id}`].openingDebitBalance)
    - Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts[`${id}`].openingCreditBalance);
  Account.closingPeriod = Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts[`${id}`].closingDebitBalance)
    - Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts[`${id}`].closingCreditBalance);
  let openingPeriodSign = 1;
  if (Account.openingPeriod < 0) {
    openingPeriodSign *= -1;
  }
  Account.growth = (Account.closingPeriod / Account.openingPeriod) * 100 * openingPeriodSign;
  return Account;
};

const getGrossProfit = (SAFT) => {
  const netRevenue = getGeneralLedgerAccount(SAFT, 71);
  const cogs = getGeneralLedgerAccount(SAFT, 61);

  if (netRevenue && cogs) {
    const gp = {};
    gp.openingPeriod = netRevenue.openingPeriod - cogs.openingPeriod;
    gp.closingPeriod = netRevenue.closingPeriod - cogs.closingPeriod;
    let openingPeriodSign = 1;
    if (gp.openingPeriod < 0) {
      openingPeriodSign *= -1;
    }
    gp.growth = (gp.closingPeriod / gp.openingPeriod) * 100 * openingPeriodSign;
    return gp;
  }
  return null;
};

const Finances = (props) => {
  const { SAFT } = props;
  const ar = getGeneralLedgerAccount(SAFT, 21);
  const ap = getGeneralLedgerAccount(SAFT, 22);
  const grossProfit = getGrossProfit(SAFT);

  if (grossProfit) {
    return (
      <Segment>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <DisplaySegment
                text="Accounts Receivable"
                number={ar.closingPeriod}
                type="€"
                growth={ar.growth}
              />
            </Grid.Column>
            <Grid.Column>
              <DisplaySegment
                text="Accounts Payable"
                number={ap.closingPeriod}
                type="€"
                growth={ap.growth}
              />
            </Grid.Column>
            <Grid.Column>
              <DisplaySegment
                text="Gross Profit"
                number={grossProfit.closingPeriod}
                type="€"
                growth={grossProfit.growth}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
  return (
    <Segment>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <DisplaySegment
              text="Accounts Receivable"
              number={ar.closingPeriod}
              type="€"
              growth={ar.growth}
            />
          </Grid.Column>
          <Grid.Column>
            <DisplaySegment
              text="Accounts Payable"
              number={ap.closingPeriod}
              type="€"
              growth={ap.growth}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

Finances.propTypes = {
  SAFT: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Finances;
