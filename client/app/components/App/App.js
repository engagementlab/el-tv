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
      slidesList: null,
      videoEnabled: null,
      videoId: null,
      chyronContent: null
    }
  }

  async componentDidMount() {

    let url = (process.env.NODE_ENV === 'production') ? 'https://elab.emerson.edu/' : 'https://qa.engagementgamelab.org/';
    const data = (await axios.get(url+'api/tv/get')).data[0];

    const slidesList = _.map(data.slideshowImages, 'secure_url');
    const chyronContent = data.currentBlurb;
    const videoEnabled = data.displayVideo;
    const videoId = data.videoId;

    this.setState({
      slidesList,
      videoEnabled,
      videoId,
      chyronContent
    });

  }

  slideshow() {

    if(this.state.videoEnabled === true) {

      let url = 'https://player.vimeo.com/video/' + this.state.videoId + '?background=1&color=000000&byline=0&portrait=0';
      return (
        <div>
          <div className="video">
            <iframe 
            src={url} 
            frameBorder="0" 
            webkitallowfullscreen="true" 
            mozallowfullscreen="true" 
            allowFullScreen></iframe>
            <script src="https://player.vimeo.com/api/player.js"></script>
          </div>
        </div>
      )

    }
    else {
     
      return (
        <Slideshow
          autoplay={true}
          showArrows={false}
          slideInterval={6500}
          defaultIndex={0}
          slides={this.state.slidesList}
          effect={'left'}
          height={'100%'}
          width={'100%'}
        />
      )

    }

  }

  chyron() {


    const content = this.state.chyronContent.map((txt, index) => {
        return <span key={index} className="item">
                {txt} 
                {index < this.state.chyronContent.length-1 && <img src="assets/img/logo.png" alt="Logo" />}
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
          <div id="content">
            { this.state.chyronContent && this.chyron() }
          </div>
        </div>

      </div>
    );
  }
}

export default App;
