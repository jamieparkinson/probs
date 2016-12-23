import React from 'react';
import {render} from 'react-dom';
import {Image, Input, Grid} from 'stardust';
import 'whatwg-fetch';

import DistributionCard from './components/card.jsx';

const TopBar = () => (
  <Grid className="sticky" padded className="topbar">
    <Grid.Column width={4}>
      <Image src='public/probs.svg' className="probs-img"/>
      <div className="probs-description">
        Probability distribution explorer
      </div>
    </Grid.Column>
    <Grid.Column width={12}>
      <Input className="fluid icon right" icon="search red" placeholder="Search for a distribution..." />
    </Grid.Column>
  </Grid>
);

const DistributionCards = ({cards}) => {
  var cardList = cards.map(card => (<DistributionCard {...card} key={card.title} />));
  return (
    <div className="ui cards">
      {cardList}
    </div>
  );
}

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cards: [] };
  }

  componentDidMount() {
    fetch('./distributionData.json').then(response => response.json())
                                    .then(json => { this.setState({ cards: json }); console.log("did got"); });
  }

  render() {
    return(
      <div>
        <TopBar/>
        <div className="card-section-container">
          <DistributionCards cards={this.state.cards} />
        </div>
      </div>
    );
  }
};

render(<MainContainer />, document.getElementById('app'));