import React from "react";
import PropTypes from "prop-types";

import {MINUTES_IN_HOUR, SECONDS_IN_MINUTE} from "../../constants";
import history from "../../history";

const withFullscreenVideoPlayerStatus = (Component) => {
  class WithFullscreenVideoPlayerStatus extends React.PureComponent {
    constructor(props) {
      super(props);

      const {film} = this.props;
      const {runTime} = film;

      this.state = {
        isPlaying: false,
        isFullscreenModeEnabled: false,
        progress: 0,
        timeRemaining: runTime * SECONDS_IN_MINUTE,
      };

      this._videoRef = React.createRef();
      this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
      this.handleFullScreenButtonClick = this.handleFullScreenButtonClick.bind(this);
      this.handleVideoEnd = this.handleVideoEnd.bind(this);
      this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
      this.formatRemainingTime = this.formatRemainingTime.bind(this);
      this.handleExitButtonClick = this.handleExitButtonClick.bind(this);
    }

    formatRemainingTime() {
      const {timeRemaining} = this.state;
      const hours = Math.floor(timeRemaining / MINUTES_IN_HOUR / SECONDS_IN_MINUTE);
      const minutes = Math.floor((timeRemaining - hours * MINUTES_IN_HOUR * SECONDS_IN_MINUTE) / MINUTES_IN_HOUR);
      const seconds = Math.floor(timeRemaining - (hours * MINUTES_IN_HOUR * SECONDS_IN_MINUTE) - (minutes * SECONDS_IN_MINUTE));

      return `${hours < 10 ? `0` + Math.floor(hours) : Math.floor(hours)}:${minutes < 10 ? `0` + Math.floor(minutes) : Math.floor(minutes)}:${seconds < 10 ? `0` + Math.ceil(seconds) : Math.ceil(seconds)}`;
    }

    handlePlayButtonClick() {
      const {isPlaying} = this.state;

      this.setState({
        isPlaying: !isPlaying,
      });

      this._videoRef.current.play();
    }

    handleExitButtonClick() {
      history.goBack();
    }

    handleFullScreenButtonClick() {
      const {isFullscreenModeEnabled} = this.state;
      const video = this._videoRef.current;

      if (!isFullscreenModeEnabled) {
        video.requestFullscreen();
        this.setState({
          isFullscreenModeEnabled: true
        });
      } else {
        this.setState({
          isFullscreenModeEnabled: false
        });
      }
    }

    handleVideoEnd() {
      this.setState({
        isPlaying: false,
      });
    }

    handleTimeUpdate() {
      const {film} = this.props;
      const {isPlaying} = this.state;

      if (isPlaying === true) {
        const {runTime} = film;
        const actualTime = Math.floor(this._videoRef.current.currentTime);

        this.setState({
          progress: (actualTime / (runTime * SECONDS_IN_MINUTE)) * 100,
          timeRemaining: (runTime * SECONDS_IN_MINUTE) - actualTime,
        });
      } else {
        this._videoRef.current.oncanplaythrough = null;
      }
    }

    render() {
      const {isPlaying, isFullscreenModeEnabled, progress, timeRemaining} = this.state;

      return <Component {...this.props}
        isPlaying={isPlaying}
        isFullscreenModeEnabled={isFullscreenModeEnabled}
        progress={progress}
        timeRemaining={timeRemaining}
        videoRef={this._videoRef}
        onVideoEnd={this.handleVideoEnd}
        onTimeUpdate={this.handleTimeUpdate}
        formatRemainingTime={this.formatRemainingTime}
        onPlayButtonClick={this.handlePlayButtonClick}
        onFullScreenButtonClick={this.handleFullScreenButtonClick}
        onExitButtonClick={this.handleExitButtonClick}
      />;
    }

    componentDidMount() {
      const video = this._videoRef.current;

      video.oncanplaythrough = () => {
        this.setState({
          isPlaying: true,
        });
      };
    }

    componentDidUpdate() {
      const {isPlaying} = this.state;
      const video = this._videoRef.current;
      const videoPlayPromise = video.play();

      if (videoPlayPromise !== undefined) {
        videoPlayPromise.then(() => {
          if (!isPlaying) {
            video.pause();
          }
        });
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.oncanplaythrough = null;
      video.src = ``;
      video.onended = null;
      video.ontimeupdate = null;
    }
  }

  WithFullscreenVideoPlayerStatus.propTypes = {
    film: PropTypes.exact({
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      releaseDate: PropTypes.string.isRequired,
      ratingScore: PropTypes.number.isRequired,
      ratingsNumber: PropTypes.number.isRequired,
      director: PropTypes.string.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string,
      preview: PropTypes.string.isRequired,
      runTime: PropTypes.number.isRequired,
      previewImage: PropTypes.string.isRequired,
      videoLink: PropTypes.string.isRequired,
      isFavorite: PropTypes.bool.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      backgroundImage: PropTypes.string.isRequired,
    }),
  };

  return WithFullscreenVideoPlayerStatus;
};

export default withFullscreenVideoPlayerStatus;
