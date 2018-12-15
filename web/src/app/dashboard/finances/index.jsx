import React from 'react';
import { Grid } from 'semantic-ui-react';

import dashboardPage from '../dashboardPage';
import DisplaySegment from '../displaySegment';

const Finances = () => (
  <Grid>
    <Grid.Row columns={3}>
      <Grid.Column>
        <DisplaySegment text="Accounts Receivable" number={100} type="€" growth={10} />
      </Grid.Column>
      <Grid.Column>
        <DisplaySegment text="Accounts Payable" number={98} type="€" />
      </Grid.Column>
      <Grid.Column>
        <DisplaySegment text="AR-AP" number={2} type="€" />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default dashboardPage(Finances);
