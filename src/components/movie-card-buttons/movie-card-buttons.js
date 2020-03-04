import React from "react";
import PropTypes from "prop-types";

const MovieCardButtons = ({isMainPageElement}) => {
  return (
    <div className="movie-card__buttons">
      <button className="btn btn--play movie-card__button" type="button">
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"/>
        </svg>
        <span>Play</span>
      </button>
      <button className="btn btn--list movie-card__button" type="button">
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"/>
        </svg>
        <span>My list</span>
      </button>
      {
        isMainPageElement ?
          <a href="add-review.html" className="btn movie-card__button">Add review</a>
          : null
      }
    </div>
  );
};

MovieCardButtons.defaultProps = {
  isMainPageElement: false
};

MovieCardButtons.propTypes = {
  isMainPageElement: PropTypes.bool.isRequired
};

export default MovieCardButtons;
