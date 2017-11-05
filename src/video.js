import React, { Component} from 'react';
import {withRouter} from 'react-router-dom';
import './App.css';
import ReactPlayer from 'react-player';

class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      currentId: this.props.id
    }
  }

  render() {
    const {playing, currentId} = this.state;
    const {url, title} = this.props;

    return (
      <div className="media-player">
        <ReactPlayer
          height="80%"
          width="80%"
          id={`player-${currentId}`}
          url={url}
          onEnded={this.onEnd(currentId)}
          playing={playing} />

        <input
          id={`${currentId}-checkbox`} type="checkbox" onClick={this.vidPlaying(currentId)}
          className="overlay" />

        <label>{title}</label>
      </div>
    );
  }

  vidPlaying = (i) => (e) => {
    const checkbox = document.getElementById(i+"-checkbox");

    if (checkbox.checked === true) {
      this.setState({ playing: true });
    } else {
      this.setState({ playing: false });
    }
  }

  onEnd = (last) => (e) => {
    const next = last + 1;
    const checkboxlast = document.getElementById(last+"-checkbox");
    const checkboxnext = document.getElementById(next+"-checkbox");
    const first = document.getElementById("0-checkbox");
    checkboxlast.checked = false;

    if (checkboxnext) {
      checkboxnext.click();
    } else {
      first.click();
    }
  }
}

export default withRouter(Video);
