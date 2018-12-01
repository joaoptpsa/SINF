import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import dashboardPage from '../dashboardPage';
import GrowthSegment from '../growthSegment';
import MonthlyChart from './monthlyChart';

const Finances = (props) => {
    const {
        SAFT,
        getNumSales,
        getNumCostumers,
        getGrossProfitFromInvoices,
    } = props;

    return (
        <Grid>
            <Grid.Row columns={4}>
                <Grid.Column>
                    <GrowthSegment text="Return on sales" number={100} />
                </Grid.Column>
                <Grid.Column>
                    <GrowthSegment text="Return on assets" number={100} />
                </Grid.Column>
                <Grid.Column>
                    <GrowthSegment text="Return on equity" number={100} />
                </Grid.Column>
                <Grid.Column>
                    <GrowthSegment text="Profit growth" number={100} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <MonthlyChart
                        invoices={SAFT.sourceDocuments.invoices}
                        getNumSales={getNumSales}
                        getNumCostumers={getNumCostumers}
                        getGrossProfitFromInvoices={getGrossProfitFromInvoices}
                    />
                </Grid.Column>
                <Grid.Column>
                    <MonthlyChart
                        invoices={SAFT.sourceDocuments.invoices}
                        getNumSales={getNumSales}
                        getNumCostumers={getNumCostumers}
                        getGrossProfitFromInvoices={getGrossProfitFromInvoices}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

Finances.propTypes = {
    SAFT: PropTypes.object.isRequired,
};

export default dashboardPage(Finances);