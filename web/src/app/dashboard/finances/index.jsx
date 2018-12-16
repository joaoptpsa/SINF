import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import DisplaySegment from '../displaySegment';

const getAR = (SAFT) => {
  const AR = {};
  AR.openingPeriod = Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts['21'].openingDebitBalance)
    - Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts['21'].openingCreditBalance);
  AR.closingPeriod = Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts['21'].closingDebitBalance)
    - Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts['21'].closingCreditBalance);
  let openingPeriodSign = 1;
  if (AR.openingPeriod < 0) {
    openingPeriodSign *= -1;
  }
  AR.growth = (AR.closingPeriod / AR.openingPeriod) * 100 * openingPeriodSign;
  return AR;
};

const getAP = (SAFT) => {
  const AP = {};
  AP.openingPeriod = Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts['22'].openingDebitBalance)
    - Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts['22'].openingCreditBalance);
  AP.closingPeriod = Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts['22'].closingDebitBalance)
    - Number.parseFloat(SAFT.masterFiles.generalLedgerAccounts['22'].closingCreditBalance);
  let openingPeriodSign = 1;
  if (AP.openingPeriod < 0) {
    openingPeriodSign *= -1;
  }
  AP.growth = (AP.closingPeriod / AP.openingPeriod) * 100 * openingPeriodSign;
  return AP;
};

const getGeneralLedgerAccount = (SAFT, id) => {
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

const getQuickRatio = (SAFT) => {
  const cash1 = getGeneralLedgerAccount(SAFT, 11);
  const cash2 = getGeneralLedgerAccount(SAFT, 12);
  const ar = getGeneralLedgerAccount(SAFT, 21);

  // TODO: current liabilities

  return cash1;
};

const Finances = (props) => {
  const { SAFT } = props;
  const AR = getAR(SAFT);
  const AP = getAP(SAFT);
  const quickRatio = getQuickRatio(SAFT);

  return (
    <Segment>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <DisplaySegment
              text="Accounts Receivable"
              number={AR.closingPeriod}
              type="€"
              growth={AR.growth}
            />
          </Grid.Column>
          <Grid.Column>
            <DisplaySegment
              text="Accounts Payable"
              number={AP.closingPeriod}
              type="€"
              growth={AP.growth}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <DisplaySegment
              text="Quick Ratio"
              number={quickRatio.closingPeriod}
              type="€"
              growth={quickRatio.growth}
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
