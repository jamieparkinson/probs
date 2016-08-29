import React from 'react';
import {render} from 'react-dom';

import {Rail, Image, Container, Input, Grid} from 'stardust';

const TopBar = () => (
	<Grid className="sticky" padded className="topbar">
		<Grid.Column width={4}>
		  <Image src='public/probs.svg' className="probs-img"/>
		  <div className="probs-description">
		  	Probability distribution explorer.
		  </div>
	  </Grid.Column>
	  <Grid.Column width={12}>
	  	<Input className="fluid icon right" icon="search red" placeholder="Search for a distribution..." />
	  </Grid.Column>
  </Grid>
);

const MainContainer = () => (
	<div>
		<TopBar/>
		<Container>
			Hello
		</Container>
	</div>
);

render(<MainContainer />, document.getElementById('app'));