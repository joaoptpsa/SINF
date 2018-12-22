import React from 'react';
import { Segment, Grid, Message } from 'semantic-ui-react';
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

  return (
    <Segment>
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column>
            {ar != null ? (
              <DisplaySegment
                text="Accounts Receivable"
                number={-ar.total}
                type="€"
                growth={-ar.growth}
              />
            ) : (
              <Segment>
                <Message error>
                  No accounts receivable data in SAFT (probably GeneralLedgerAccounts is missing
                  from SAFT).
                </Message>
              </Segment>
            )}
          </Grid.Column>
          <Grid.Column>
            {ap != null ? (
              <DisplaySegment
                text="Accounts Payable"
                number={-ap.total}
                type="€"
                growth={-ap.growth}
              />
            ) : (
              <Segment>
                <Message error>
                  No accounts payable data in SAFT (probably GeneralLedgerAccounts is missing from
                  SAFT).
                </Message>
              </Segment>
            )}
          </Grid.Column>
          <Grid.Column>
            {grossProfit == null ? (
              <Segment>
                <Message error>
                  No growth profit data in SAFT (probably GeneralLedgerAccounts is missing from
                  SAFT).
                </Message>
              </Segment>
            ) : (
              <DisplaySegment text="Gross Profit" number={grossProfit} type="€" />
            )}
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
