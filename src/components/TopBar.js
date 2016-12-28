import React from 'react';
import {
    Grid,
    Image,
    Input
} from 'semantic-ui-react';

import probsLogo from './img/probs.svg';

const TopBar = ({ onFilter }) => (
    <Grid className="sticky topbar" padded stackable>
        <Grid.Column width={4}>
            <Image src={probsLogo} className="probs-img"/>
            <div className="probs-description">
                Probability distribution explorer
            </div>
        </Grid.Column>
        <Grid.Column width={12}>
            <Input className="fluid icon right"
                   icon="search"
                   placeholder="Filter distributions..."
                   onChange={(event) => onFilter(event.target.value)}/>
        </Grid.Column>
    </Grid>
);

export default TopBar;