import React from 'react';
import {render} from 'react-dom';
import debounce from 'debounce';

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
            cards: distributionData,
            shownCards: distributionData
        };

        this.handleFilter = debounce(this.handleFilter, 200);
    }

    handleFilter(filterText) {
        this.setState({
            shownCards: this.state.cards.filter(card => card.title.toLowerCase().includes(filterText.toLowerCase()))
        });
    }

    render() {
        return (
            <div>
                <TopBar onFilter={this.handleFilter.bind(this)}/>

                {this.state.shownCards.length > 0 ?
                    <div className="card-section-container">
                        <div className="ui cards">
                            {this.state.shownCards.map(card => (
                                <DistributionCard {...card} key={card.title}/>
                            ))}
                        </div>
                    </div>
                :
                    <div className="no-dists">
                        <p>
                            We don't know any distributions with that name :(
                        </p>
                    </div>
                }
            </div>
        );
    }
}

render(<MainContainer />, document.getElementById('root'));