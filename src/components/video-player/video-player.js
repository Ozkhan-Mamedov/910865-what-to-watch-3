import React from "react";
import PropTypes from "prop-types";

import {PREVIEW_PLAYER_PROPERTIES} from "../../constants";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPaused: true,
      isPlaying: false,
    };

    this._videoRef = React.createRef();
  }

  render() {
    const {poster} = this.props;

    return (
      <video
        width={PREVIEW_PLAYER_PROPERTIES.WIDTH}
        height={PREVIEW_PLAYER_PROPERTIES.HEIGHT}
        poster={poster}
        ref={this._videoRef}
      />
    );
  }

  componentDidMount() {
    const {src} = this.props;
    const video = this._videoRef.current;

    video.src = src;
    video.oncanplaythrough = () => {
      video.muted = true;
      this.setState({
        isPaused: false,
        isPlaying: true,
      });
    };
  }

  componentDidUpdate() {
    const {isPaused, isPlaying} = this.state;
    const video = this._videoRef.current;

    if (isPaused) {
      return;
    }

    if (isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.src = ``;
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default VideoPlayer;
