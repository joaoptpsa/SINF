import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import dashboardPage from '../dashboardPage';
import GrowthSegment from '../growthSegment';
import MostValuableCostumersSegment from '../mostValuableCostumersSegment';

const Finances = (props) => {
    const {
        SAFT,
        numSales,
        grossProfit,
        top5Costumers,
        top5Products,
        numCostumers,
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
                    <MostValuableCostumersSegment top5Costumers={top5Costumers} />
                </Grid.Column><Grid.Column>
                    <MostValuableCostumersSegment top5Costumers={top5Costumers} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

Finances.propTypes = {
    SAFT: PropTypes.object.isRequired,
};

export default dashboardPage(Finances);