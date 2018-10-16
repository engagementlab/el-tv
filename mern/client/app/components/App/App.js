import React, { Component } from 'react';

import './App.scss';
// import logo from '../logo.png';

import Slideshow from 'react-slidez';
import axios from 'axios';

import * as _ from 'lodash';

class App extends Component {

  constructor(props) {
    super(props)

    this.slideshow = this.slideshow.bind(this)
    this.state = {
      slidesList: null,
      chyronContent: null
    }
  }

  async componentDidMount() {

    const data = (await axios.get('http://localhost:3000/api/tv/get')).data[0];
    const slidesList = _.map(data.slideshowImages, 'secure_url');
    const chyronContent  = data.currentBlurb;

    this.setState({
      slidesList,
      chyronContent
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

  chyron() {


    const content = this.state.chyronContent.map((txt, key) => {
        return <span class="item">
                {txt} <img src="assets/img/logo.png" alt="Logo" />
              </span>;
    });
    return content;

  }

  render() {
    return (    
      <div>
        <div>
          {this.state.slidesList === null &&  <p>Loading...</p>}
          { this.state.slidesList && this.slideshow() }
        </div>
        <div id="chyron">
          { this.state.chyronContent && this.chyron() }
        </div>
      </div>
    );
  }
}

export default App;
