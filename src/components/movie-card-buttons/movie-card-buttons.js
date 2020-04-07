import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {AppRoute, AuthorizationStatus} from "../../constants";

const MovieCardButtons = (props) => {
  const {isMainPageElement, authorizationStatus, film, isFilmAddedToWatch, onAddToWatchButtonClick} = props;

  return (
    <div className="movie-card__buttons">
      <Link to={`${AppRoute.PLAYER}/${film.id - 1}`} className="btn btn--play movie-card__button" >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"/>
        </svg>
        <span>Play</span>
      </Link>
      {
        authorizationStatus === AuthorizationStatus.AUTH ?
          <button className="btn btn--list movie-card__button" type="button" onClick={onAddToWatchButtonClick}>
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref={isFilmAddedToWatch ? `#in-list` : `#add`}/>
            </svg>
            <span>My list</span>
          </button>
          : null
      }
      {
        isMainPageElement === false && (authorizationStatus === AuthorizationStatus.AUTH) ?
          <Link to={`${AppRoute.FILM}/${film.id - 1}/review`} className="btn movie-card__button">Add review</Link>
          : null
      }
    </div>
  );
};

MovieCardButtons.defaultProps = {
  isMainPageElement: false
};

MovieCardButtons.propTypes = {
  isMainPageElement: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string,
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
  isFilmAddedToWatch: PropTypes.bool,
  onAddToWatchButtonClick: PropTypes.func.isRequired,
};

export default MovieCardButtons;
