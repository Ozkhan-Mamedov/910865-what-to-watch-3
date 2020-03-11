import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer/app/action-creator";
import {AUTHORIZATION_STATUS} from "../../constants";

const MovieCardButtons = ({isMainPageElement, renderPlayer, authorizationStatus, onAddReviewButtonClick}) => {
  return (
    <div className="movie-card__buttons">
      <button className="btn btn--play movie-card__button" type="button" onClick={renderPlayer}>
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
        isMainPageElement || (authorizationStatus === AUTHORIZATION_STATUS.AUTH) ?
          <a href="add-review.html" className="btn movie-card__button" onClick={onAddReviewButtonClick}>Add review</a>
          : null
      }
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  renderPlayer() {
    dispatch(ActionCreator.renderPlayer());
  }
});

MovieCardButtons.defaultProps = {
  isMainPageElement: false
};

MovieCardButtons.propTypes = {
  isMainPageElement: PropTypes.bool.isRequired,
  renderPlayer: PropTypes.func,
  authorizationStatus: PropTypes.string,
  onAddReviewButtonClick: PropTypes.func,
};

export {MovieCardButtons};
export default connect(null, mapDispatchToProps)(MovieCardButtons);
