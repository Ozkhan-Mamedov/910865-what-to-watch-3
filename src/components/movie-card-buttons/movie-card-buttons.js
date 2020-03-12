import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer/app/action-creator";
import {AUTHORIZATION_STATUS} from "../../constants";

class MovieCardButtons extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isFilmAddedToWatch: false,
    };

    this.onAddToWatchButtonClick = this.onAddToWatchButtonClick.bind(this);
  }

  onAddToWatchButtonClick() {
    const {isFilmAddedToWatch} = this.state;
    const {addFilmToWatch, removeFilmToWatch, film} = this.props;

    this.setState({
      isFilmAddedToWatch: !isFilmAddedToWatch,
    });

    if (!isFilmAddedToWatch) {
      this.setState({
        isFilmAddedToWatch: true,
      });
      addFilmToWatch(film);
    } else {
      this.setState({
        isFilmAddedToWatch: false,
      });
      removeFilmToWatch(film);
    }
  }

  render() {
    const {isFilmAddedToWatch} = this.state;
    const {isMainPageElement, renderPlayer, authorizationStatus, onAddReviewButtonClick} = this.props;

    return (
      <div className="movie-card__buttons">
        <button className="btn btn--play movie-card__button" type="button" onClick={renderPlayer}>
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"/>
          </svg>
          <span>Play</span>
        </button>
        <button className="btn btn--list movie-card__button" type="button" onClick={this.onAddToWatchButtonClick}>
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref={isFilmAddedToWatch ? `#in-list` : `#add`}/>
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
  }
}

const mapDispatchToProps = (dispatch) => ({
  renderPlayer() {
    dispatch(ActionCreator.renderPlayer());
  },
  addFilmToWatch(film) {
    dispatch(ActionCreator.addFilmToWatch(film));
  },
  removeFilmToWatch(film) {
    dispatch(ActionCreator.removeFilmToWatch(film));
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

MovieCardButtons.propTypes = {
  addFilmToWatch: PropTypes.func,
  removeFilmToWatch: PropTypes.func,
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
  })
};

export {MovieCardButtons};
export default connect(null, mapDispatchToProps)(MovieCardButtons);
