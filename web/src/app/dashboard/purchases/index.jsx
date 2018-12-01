import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import dashboardPage from '../dashboardPage';

const Purchases = (props) => {
    const {
        SAFT
    } = props;

    return (
        /* feel free to delete code below*/
        < Card fluid >
            <Card.Content>
                <Card.Header>
                    Purchases Page
                </Card.Header>
            </Card.Content>
            <Card.Content>
                Lorem xpmsasd
            </Card.Content>
        </Card >
    );
};

Purchases.propTypes = {
    SAFT: PropTypes.object.isRequired,
};

export default dashboardPage(Purchases);