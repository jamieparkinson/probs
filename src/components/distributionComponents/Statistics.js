import React from 'react';
import {InlineMath} from 'react-katex';
import {Card} from 'semantic-ui-react';
import {
    Tab,
    Tabs,
    TabList,
    TabPanel
} from 'react-tabs';

Tabs.setUseDefaultStyles(false);
import './Statistics.css'

const Statistics = ({values}) => {
    return (
        <Card.Content className="Statistics">
            <Tabs>
                <TabList>
                    {Object.keys(values).map(statName => (
                        <Tab key={statName}>
                            {statName}
                        </Tab>
                    ))}
                </TabList>

                {Object.keys(values).map(statName => (
                    <TabPanel key={statName}>
                        <InlineMath>
                            {values[statName]}
                        </InlineMath>
                    </TabPanel>
                ))}
            </Tabs>
        </Card.Content>
    );
};

export default Statistics;