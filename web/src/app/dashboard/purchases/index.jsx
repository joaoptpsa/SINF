import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import dashboardPage from '../dashboardPage';
import GrowthSegment from '../growthSegment';
import MostValuableCostumersSegment from '../mostValuableCostumersSegment';
import TopProductsPiechartSegment from '../topProductsPiechartSegment';


const Purchases = (props) => {
    const {
        top5Costumers,
        top5Products,
    } = props;

    return (
        <Grid>
            <Grid.Row columns={4}>
                <Grid.Column>
                    <GrowthSegment text="Total purchases" number={100} />
                </Grid.Column>
                <Grid.Column>
                    <GrowthSegment text="Total suppliers" number={100} />
                </Grid.Column>
                <Grid.Column>
                    <GrowthSegment text="Purchases growth" number={100} />
                </Grid.Column>
                <Grid.Column>
                    <GrowthSegment text="Number of purchases" number={100} />
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
                    <MostValuableCostumersSegment top5Costumers={top5Costumers} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <TopProductsPiechartSegment title="Spending by item" top5Products={top5Products} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

Purchases.propTypes = {
    SAFT: PropTypes.object.isRequired,
};

export default dashboardPage(Purchases);