import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import DisplaySegment from '../displaySegment';

const getGeneralLedgerAccount = (SAFT, id) => {
  const generalLedgerAccount = SAFT.masterFiles.generalLedgerAccounts[id];

  if (!generalLedgerAccount) {
    return null;
  }

  const openingCreditBalance = Number.parseFloat(generalLedgerAccount.openingCreditBalance);
  const closingCreditBalance = Number.parseFloat(generalLedgerAccount.closingCreditBalance);
  const openingDebitBalance = Number.parseFloat(generalLedgerAccount.openingDebitBalance);
  const closingDebitBalance = Number.parseFloat(generalLedgerAccount.closingDebitBalance);

  const credit = closingCreditBalance - openingCreditBalance;
  const debit = closingDebitBalance - openingDebitBalance;
  const total = Math.abs(credit - debit);
  const openingBalance = openingCreditBalance - openingDebitBalance;
  const closingBalance = closingCreditBalance - closingDebitBalance;
  const growth = openingBalance !== 0 ? closingBalance / openingBalance : closingBalance;

  const account = {
    credit,
    debit,
    openingBalance,
    closingBalance,
    total,
    growth,
  };

  return account;
};

const getGrossProfit = (SAFT) => {
  const netRevenue = getGeneralLedgerAccount(SAFT, 71);
  const cogs = getGeneralLedgerAccount(SAFT, 61);

  if (netRevenue && cogs) {
    return netRevenue.total - cogs.total;
  }
  return null;
};

const Finances = (props) => {
  const { SAFT } = props;
  const ar = getGeneralLedgerAccount(SAFT, 21); // accounts receivable

  const ap = getGeneralLedgerAccount(SAFT, 22); // accounts payable

  const grossProfit = getGrossProfit(SAFT); // gross profit

  if (grossProfit != null && ar != null && ap != null) {
    return (
      <Segment>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <DisplaySegment
                text="Accounts Receivable"
                number={-ar.total}
                type="€"
                growth={-ar.growth}
              />
            </Grid.Column>
            <Grid.Column>
              <DisplaySegment
                text="Accounts Payable"
                number={-ap.total}
                type="€"
                growth={-ap.growth}
              />
            </Grid.Column>
            <Grid.Column>
              <DisplaySegment text="Gross Profit" number={grossProfit} type="€" />
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
