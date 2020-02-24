import React from "react";
import PropTypes from "prop-types";

const VIDEO_PROPERTIES = {
  WIDTH: 280,
  HEIGHT: 175,
};

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
        width={VIDEO_PROPERTIES.WIDTH}
        height={VIDEO_PROPERTIES.HEIGHT}
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
