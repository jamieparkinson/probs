import React from 'react';
import {render} from 'react-dom';

import {
    TopBar,
    DistributionCard
} from './components/';

import './components/Probs.css';

import distributionData from './distributionData.json';
// Sort by name
distributionData.sort((a,b) => {
    const lcA = a.title.toLowerCase();
    const lcB = b.title.toLowerCase();
    if (lcA < lcB) {
        return -1;
    } else if (lcA > lcB) {
        return +1;
    }
    return 0;
});

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: distributionData
        };
    }

    render() {
        return (
            <div>
                <TopBar/>
                <div className="card-section-container">
                    <div className="ui cards">
                        {this.state.cards.map(card => (
                            <DistributionCard {...card} key={card.title}/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

render(<MainContainer />, document.getElementById('root'));