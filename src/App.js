import React, { Component } from 'react';
import './App.css';
// import logo from './logo.svg';

import Slideshow from 'react-slidez';

class App extends Component {

  constructor(props) {
    super(props)

    this.slideshow = this.slideshow.bind(this)
  }

  slideshow() {
    const slidesList = [
      'http://res.cloudinary.com/engagement-lab-home/image/upload/v1454529995/site/about/apb5l5krpgjmrmpsxfku.jpg',
      'http://res.cloudinary.com/engagement-lab-home/image/upload/v1454529958/site/about/bba53b4i9kfltzhn7aye.jpg'
    ]

    return (
      <Slideshow
        autoplay={true}
        showArrows={false}
        slideInterval={6500}
        defaultIndex={0}
        slides={slidesList}
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
          { this.slideshow() }
        </div>
        <div id="banner">
          Welcome to the Engagement Lab!
        </div>
      </div>
    );
  }
}

export default App;
