import React, { Component} from 'react';
import {withRouter} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Video from './video.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sources: []
    }
  }

  componentDidMount() {
    this.getSrc();
  }

  render() {
    const {sources} = this.state;

    return (
      <div className="App">
        <h1>mixtape</h1>

        <p>{sources.length} tracks</p>

        <div className="videos">
          {sources.map((src, i) => {
            return(
              <div key={i} className="video">
                <Video
                  id={i}
                  url={src.source.url}
                  title={src.title} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  getSrc = () => {
    const {sources} = this.state;
    const sourceArray = sources.slice();
    let mixtapeChannel = "/mixtape-1509221468";

    if (this.props.location.pathname !== '/') {
      mixtapeChannel = this.props.location.pathname;
    }

    axios.get(`https://api.are.na/v2/channels${mixtapeChannel}/contents`).then((response) => {
      const res = response.data.contents;

      res.map((item) => {
        if (item.embed) {
          if (item.embed.html) {
            sourceArray.push(item);
            this.setState({ sources: sourceArray});
          }
        }
        return false;
      })
    }).catch(error => console.error(error))
  }
}

export default withRouter(App);
