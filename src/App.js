import React, { Component} from 'react';
import {withRouter} from 'react-router-dom';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

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
        <h1>m i x t a p e</h1>
        <p>{sources.length} tracks</p>
        <div className="videos">
          {sources.map((src, i) => {
            return(
              <div key={i} className="video">
                <div id={i} data-name="frame" className="frame" dangerouslySetInnerHTML={{__html: src.embed.html}}></div>
                <input id={`${i}-checkbox`}type="checkbox" onClick={this.vidPlaying.bind(this, i)} className="overlay" />
                <label>{src.title}</label>
              </div>

            );
          })}
        </div>
      </div>
    );
  }

  vidPlaying(i) {
    let srcauto = '';
    const clicked = document.getElementById(i);
    const checkbox = document.getElementById(i+"-checkbox");
    const iframe = clicked.innerHTML;
    const regex = /(src)=["']([^"']*)["']/gi;

    if (checkbox.checked === true) {
      iframe.replace(regex, function(all, type, value) {
        srcauto = value += "&autoplay=1";
      });
      clicked.innerHTML = `<iframe src="${srcauto}"></iframe>`;
    } else {
      iframe.replace(regex, function(all, type, value) {
        srcauto = value += "&autoplay=0";
      });
      clicked.innerHTML = `<iframe src="${srcauto}"></iframe>`;
    }
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
        if (item.embed) {
          if (item.embed.html) {
            sourceArray.push(item)
            this.setState({ sources: sourceArray})
          }
        }
      })
    }).catch(error => console.error(error))
  }
}

export default withRouter(App);
