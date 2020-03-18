import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import Header from "../header/header";
import MovieCardButtons from "../movie-card-buttons/movie-card-buttons";
import UserBlock from "../user-block/user-block";

import withFilmAddedToWatchStatus from "../../hocs/withFilmAddedToWatchStatus";

import {getAuthorizationStatus} from "../../reducer/user/selectors";

const MovieCardButtonsWrapped = withFilmAddedToWatchStatus(MovieCardButtons);

const PromoMovieCard = (props) => {
  const {promoFilm, authorizationStatus} = props;

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={promoFilm.backgroundImage} alt={promoFilm.name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header>
        <UserBlock authorizationStatus={authorizationStatus}/>
      </Header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={promoFilm.previewImage} alt={`${promoFilm.name} poster`} width="218"
              height="327"/>
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{promoFilm.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promoFilm.genre}</span>
              <span className="movie-card__year">{promoFilm.releaseDate}</span>
            </p>

            <MovieCardButtonsWrapped film={promoFilm} authorizationStatus={authorizationStatus} isMainPageElement={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

PromoMovieCard.propTypes = {
  promoFilm: PropTypes.exact({
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
  authorizationStatus: PropTypes.string,
};

export {PromoMovieCard};
export default connect(mapStateToProps)(PromoMovieCard);
