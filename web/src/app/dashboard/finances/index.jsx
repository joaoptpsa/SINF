import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {
    ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line
} from 'recharts';
import dashboardPage from '../dashboardPage';
import GrowthSegment from '../growthSegment';

const Finances = (props) => {
    const {
        top5Products,
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
                    <ResponsiveContainer height={300} width="100%">
                        <LineChart data={top5Products}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="quantity" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="description" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </Grid.Column>
                <Grid.Column>
                    <ResponsiveContainer height={300} width="100%">
                        <LineChart data={top5Products}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="quantity" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="description" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

Finances.propTypes = {
    SAFT: PropTypes.object.isRequired,
};

export default dashboardPage(Finances);