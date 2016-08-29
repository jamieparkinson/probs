import React from 'react';
import {render} from 'react-dom';
import {Image, Input, Grid} from 'stardust';

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

const card = {
  title: 'Normal Distribution',
  wiki: 'http://en.wikipedia.org/wiki/Normal_distribution',
  pdf: '(1/sqrt(2*sigma^2*pi))*exp(-(x-mu)^2/(2*sigma^2))',
  texPdf: 'f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp \\left(-\\frac{(x - \\mu)^2}{2 \\sigma^2} \\right)',
  altNames: ['Gaussian', 'Bell curve'],
  statistics: {
    Mean: '\\mu',
    Median: '\\mu',
    Mode: '\\mu',
    Variance: '\\sigma^2'
  },
  variables: {
    mu: { min: 0, max: 6, init: 3.0, tex: '\\mu' },
    sigma: { min: 0.01, max: 2.0, init: 0.75, tex: '\\sigma' }
  },
  graphLimits: {
    x: [0, 6],
    y: [0, 0.9]
  }
};

const DistributionCards = ({cards}) => {
  var cardList = cards.map(card => (<DistributionCard {...card} key={card.title} />));
  return (
    <div className="ui cards">
      {cardList}
    </div>
  );
}

const MainContainer = () => (
  <div>
    <TopBar/>
    <div className="card-section-container">
      <DistributionCards cards={[card]} />
    </div>
  </div>
);

render(<MainContainer />, document.getElementById('app'));