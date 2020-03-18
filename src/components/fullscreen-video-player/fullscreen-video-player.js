import React from "react";
import PropTypes from "prop-types";

const FullscreenVideoPlayer = (props) => {
  const {film, onExitButtonClickHandler, isPlaying, progress, videoRef, onVideoEndHandler, onTimeUpdateHandler,
    formatRemainingTime, onPlayButtonClickHandler, onFullScreenButtonClickHandler} = props;

  return (
    <div className="player">
      <video src={film.videoLink} className="player__video" poster={film.picture} ref={videoRef}
        onEnded={onVideoEndHandler}
        onTimeUpdate={() => onTimeUpdateHandler(videoRef.current.currentTime)}
      />

      <button type="button" className="player__exit" onClick={onExitButtonClickHandler}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"/>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formatRemainingTime()}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={onPlayButtonClickHandler}>
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

          <button type="button" className="player__full-screen" onClick={onFullScreenButtonClickHandler}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

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
  isPlaying: PropTypes.bool,
  progress: PropTypes.number,
  videoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
  onVideoEndHandler: PropTypes.func,
  onTimeUpdateHandler: PropTypes.func,
  formatRemainingTime: PropTypes.func,
  onPlayButtonClickHandler: PropTypes.func,
  onFullScreenButtonClickHandler: PropTypes.func
};

export default FullscreenVideoPlayer;
