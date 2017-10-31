import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const mixtapeChannel = "mixtape-1509221468";

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
        <h1>m i x t a p e</h1>
        <p>{sources.length} tracks</p>
        <div className="videos">
          {videoSrcs.map((src, i) => {
            return(
              <video width="400" controls>
                <source src={src} type="video/mp4" />
              </video>
            );
          })}
        </div>
      </div>
    );
  }

  getSrc() {
    const {sources, titles} = this.state;
    const sourceArray = sources.slice();

    axios.get(`https://api.are.na/v2/channels/${mixtapeChannel}/contents`).then((response) => {
      const res = response.data.contents;

      res.map((item) => {
        sourceArray.push(item.source.url)
        this.setState({ sources: sourceArray})
      })

      this.getVideoSrcs();
    }).catch(error => console.error(error))
  }

  getVideoSrcs() {
    const {sources, videoSrcs} = this.state;
    const videoArray = videoSrcs.slice();
    var config = {headers: {'Content-Type': 'application/json'}};

    sources.map((source, i) => {
      axios.get(`https://mixtaaape.herokuapp.com/api/info?url=${source}&flatten=false`, config).then((response) => 	{
        const res = response.data.info.formats;

        res.map(function(value, index) {
          if (value.ext === 'mp4') {
            videoArray.push(value.url)
          }
        });

        let newArr = videoArray.filter((_,i) => {
          return _.indexOf("gir,clen,lmt,dur") < 0
        });

        this.setState({ videoSrcs: newArr })
      }).catch(error => console.error(error))
    })
  }
}

export default App;
