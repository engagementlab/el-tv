import React, { Component } from 'react';
import './App.scss';

import Slideshow from 'react-slidez';
import axios from 'axios';

import * as _ from 'lodash';

class App extends Component {

  constructor(props) {
    super(props)

    this.slideshow = this.slideshow.bind(this)
    this.state = {
      slidesList: null
    }
  }

  async componentDidMount() {

    const slidesList = _.map((await axios.get('http://localhost:8080/api/photos')).data, 'url');
    this.setState({
      slidesList,
    });

  }

  slideshow() {

    return (
      <Slideshow
        autoplay={true}
        showArrows={false}
        slideInterval={6500}
        defaultIndex={0}
        slides={this.state.slidesList}
        effect={'fade'}
        height={'100%'}
        width={'100%'}
      />
    )

  }

  render() {
    return (    
      <div>
        <div>
          {this.state.slidesList === null &&  <p>Loading questions...</p>}
          {this.state.slidesList && this.slideshow() }
        </div>
        <div id="banner">
          Welcome to the Engagement Lab!
        </div>
      </div>
    );
  }
}

export default App;
