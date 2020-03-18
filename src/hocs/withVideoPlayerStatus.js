import React from "react";
import PropTypes from "prop-types";

const withVideoPlayerStatus = (Component) => {
  class WithVideoPlayerStatus extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPaused: true,
        isPlaying: false,
      };

      this._videoRef = React.createRef();
    }

    render() {
      return <Component {...this.props}
        videoRef={this._videoRef}
      />;
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

  WithVideoPlayerStatus.propTypes = {
    src: PropTypes.string.isRequired
  };

  return WithVideoPlayerStatus;
};

export default withVideoPlayerStatus;
