import React, { Component} from 'react';
import {withRouter} from 'react-router-dom';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      sources: [],
      videoSrcs: []
    }
  }

  componentDidMount() {
    this.getSrc();
  }

  render() {
    const {sources, videoSrcs} = this.state;

    return (
      <div className="App">
        <h1>m i x t a p e [youtube only]</h1>
        <p>{sources.length} tracks</p>
        <div className="videos">
          {sources.map((src, i) => {
            return(
              <iframe src={src} frameBorder="0"></iframe>
            );
          })}
        </div>
      </div>
    );
  }

  getSrc() {
    const {sources} = this.state;
    const sourceArray = sources.slice();
    let mixtapeChannel = "/mixtape-1509221468";

    if (this.props.location.pathname !== '/') {
      mixtapeChannel = this.props.location.pathname;
    }

    axios.get(`https://api.are.na/v2/channels${mixtapeChannel}/contents`).then((response) => {
      const res = response.data.contents;

      res.map((item) => {
        if (item.source) {
          if (item.source.url.match(/youtube\.com/)) {
            let video_id = item.source.url.split('v=')[1];
            let ampersandPosition = video_id.indexOf('&');
            if(ampersandPosition != -1) {
              video_id = video_id.substring(0, ampersandPosition);
            }
            sourceArray.push(`https://www.youtube.com/embed/${video_id}`)
            this.setState({ sources: sourceArray})
          }
        }
      })

      this.getVideoSrcs();
    }).catch(error => console.error(error))
  }
}

export default withRouter(App);
