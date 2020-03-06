import React from "react";
import PropTypes from "prop-types";

import {MINUTES_IN_HOUR, SECONDS_IN_MINUTE} from "../../constants";

class FullscreenVideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    const {film} = this.props;
    const {runTime} = film;

    this.state = {
      isPlaying: false,
      isFullscreenModeEnabled: false,
      progress: 0,
      timeRemaining: runTime,
    };

    this._videoRef = React.createRef();
    this.onPlayButtonClickHandler = this.onPlayButtonClickHandler.bind(this);
    this.onFullScreenButtonClickHandler = this.onFullScreenButtonClickHandler.bind(this);
    this.onVideoEndHandler = this.onVideoEndHandler.bind(this);
    this.onTimeUpdateHandler = this.onTimeUpdateHandler.bind(this);
  }

  formatRemainingTime() {
    const {timeRemaining} = this.state;

    const hours = Math.floor(timeRemaining / MINUTES_IN_HOUR / SECONDS_IN_MINUTE);
    const minutes = (timeRemaining - (hours * MINUTES_IN_HOUR * SECONDS_IN_MINUTE)) / SECONDS_IN_MINUTE;
    const seconds = (timeRemaining - (timeRemaining / MINUTES_IN_HOUR / SECONDS_IN_MINUTE) - ((timeRemaining - (hours * MINUTES_IN_HOUR * SECONDS_IN_MINUTE)) / SECONDS_IN_MINUTE));

    return `${hours < 10 ? `0` + Math.floor(hours) : Math.floor(hours)}:${minutes < 10 ? `0` + Math.floor(minutes) : Math.floor(minutes)}:${seconds < 10 ? `0` + Math.ceil(seconds) : Math.ceil(seconds)}`;
  }

  onPlayButtonClickHandler() {
    const {isPlaying} = this.state;

    this.setState({
      isPlaying: !isPlaying,
    });

    this._videoRef.current.play();
  }

  onFullScreenButtonClickHandler() {
    const {isFullscreenModeEnabled} = this.state;
    const video = this._videoRef.current;

    if (!isFullscreenModeEnabled) {
      video.requestFullscreen();
      this.setState({
        isFullscreenModeEnabled: true
      });
    } else {
      video.exitFullscreen();
      this.setState({
        isFullscreenModeEnabled: false
      });
    }
  }

  onVideoEndHandler() {
    this.setState({
      isPlaying: false,
    });
  }

  onTimeUpdateHandler(secs) {
    const {film} = this.props;
    const {isPlaying} = this.state;

    if (isPlaying === true) {
      const {runTime} = film;
      const actualTime = secs;

      this.setState({
        progress: actualTime / (runTime) * 100,
        timeRemaining: ((runTime / 60) - (actualTime / 60)) * 60,
      });
    } else {
      this._videoRef.current.oncanplaythrough = null;
    }
  }

  render() {
    const {film, onExitButtonClickHandler} = this.props;
    const {isPlaying, progress} = this.state;

    return (
      <div className="player">
        <video src={film.videoLink} className="player__video" poster={film.picture} ref={this._videoRef}
          onEnded={this.onVideoEndHandler}
          onTimeUpdate={() => this.onTimeUpdateHandler(this._videoRef.current.currentTime)}
        />

        <button type="button" className="player__exit" onClick={onExitButtonClickHandler}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={progress} max="100"/>
              <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{this.formatRemainingTime()}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={this.onPlayButtonClickHandler}>
              {isPlaying ?
                <React.Fragment>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"/>
                  </svg>
                  <span>Pause</span>
                </React.Fragment>
                :
                <React.Fragment>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </React.Fragment>
              }
            </button>
            <div className="player__name">{film.name}</div>

            <button type="button" className="player__full-screen" onClick={this.onFullScreenButtonClickHandler}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"/>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
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
  }
}

FullscreenVideoPlayer.propTypes = {
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
    description: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
    previewImage: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
  }),
  onExitButtonClickHandler: PropTypes.func.isRequired,
};

export default FullscreenVideoPlayer;
