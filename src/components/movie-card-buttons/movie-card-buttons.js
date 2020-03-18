import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {Operation} from "../../reducer/data/reducer";
import {APP_ROUTES, AUTHORIZATION_STATUS} from "../../constants";

class MovieCardButtons extends React.PureComponent {
  constructor(props) {
    super(props);

    /*
    this.state = {
      isFilmAddedToWatch: this.props.film.isFavorite,
    };

    this.onAddToWatchButtonClick = this.onAddToWatchButtonClick.bind(this);*/
  }

  /*
  onAddToWatchButtonClick() {
    const {isFilmAddedToWatch} = this.state;
    const {changeFavoriteFilmStatus, film, updateData} = this.props;

    if (!isFilmAddedToWatch) {
      this.setState({
        isFilmAddedToWatch: true,
      });
      changeFavoriteFilmStatus(film.id, 1, updateData);
    } else {
      this.setState({
        isFilmAddedToWatch: false,
      });
      changeFavoriteFilmStatus(film.id, 0, updateData);
    }
  }*/

  render() {
    //const {isFilmAddedToWatch} = this.state;
    const {isMainPageElement, authorizationStatus, film, isFilmAddedToWatch, onAddToWatchButtonClick} = this.props;

    return (
      <div className="movie-card__buttons">
        <Link to={`${APP_ROUTES.PLAYER}/${film.id - 1}`} className="btn btn--play movie-card__button" >
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"/>
          </svg>
          <span>Play</span>
        </Link>
        {
          authorizationStatus === AUTHORIZATION_STATUS.AUTH ?
            <button className="btn btn--list movie-card__button" type="button" onClick={onAddToWatchButtonClick}>
              <svg viewBox="0 0 19 20" width="19" height="20">
                <use xlinkHref={isFilmAddedToWatch ? `#in-list` : `#add`}/>
              </svg>
              <span>My list</span>
            </button>
            : null
        }
        {
          isMainPageElement === false && (authorizationStatus === AUTHORIZATION_STATUS.AUTH) ?
            <Link to={`${APP_ROUTES.FILM}/${film.id - 1}/review`} className="btn movie-card__button">Add review</Link>
            : null
        }
      </div>
    );
  }
}

/*
const mapDispatchToProps = (dispatch) => ({
  changeFavoriteFilmStatus(id, status, resolver) {
    dispatch(Operation.changeFavoriteFilmStatus(id, status, resolver));
  },
  updateData() {
    dispatch(Operation.getFilmList());
    dispatch(Operation.getPromoMovieData());
    dispatch(Operation.getFavoriteFilms());
  }
});*/

/*MovieCardButtons.defaultProps = {
  isMainPageElement: false
};*/

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
  changeFavoriteFilmStatus: PropTypes.func,
  updateData: PropTypes.func,
};

export {MovieCardButtons};
//export default connect(null, mapDispatchToProps)(MovieCardButtons);
