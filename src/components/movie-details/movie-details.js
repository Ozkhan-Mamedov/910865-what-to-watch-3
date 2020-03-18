import React from "react";
import PropTypes from "prop-types";

import MovieList from "../movie-list/movie-list";
import Header from "../header/header";
import Footer from "../footer/footer";
import Tabs from "../tabs/tabs";
import MovieCardButtons from "../movie-card-buttons/movie-card-buttons";
import UserBlock from "../user-block/user-block";

import withHoveredCard from "../../hocs/withHoveredCard";
import withFilmAddedToWatchStatus from "../../hocs/withFilmAddedToWatchStatus";

import {
  TABS_KEYS,
  MORE_LIKE_THIS_LIST,
  MORE_LIKE_THIS_FILMS
} from "../../constants";

const MovieCardButtonsWrapped = withFilmAddedToWatchStatus(MovieCardButtons);
const MovieListWrapped = withHoveredCard(MovieList);

const MovieDetails = (props) => {
  const {film, filmNameClickHandler, authorizationStatus, activeTab, tabClickHandler,
    getMoreLikeThisFilm, formatRating, getTextRating, filmComment, getStarringList,
    getDateTime, getFullDate, getFilmDuration} = props;

  const _renderTab = () => {
    switch (activeTab) {
      case TABS_KEYS.OVERVIEW:
        return (
          <div className="movie-card__desc">
            <div className="movie-rating">
              <div className="movie-rating__score">{formatRating(film.ratingsNumber)}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{getTextRating(film.ratingsNumber)}</span>
                <span className="movie-rating__count">{film.ratingScore} ratings</span>
              </p>
            </div>

            <div className="movie-card__text">
              <p>{film.description}</p>
              <p className="movie-card__director"><strong>Director: {film.director}</strong></p>

              <p className="movie-card__starring"><strong>Starring: {film.starring.join(`, `)}
                {` and other`}
              </strong></p>
            </div>
          </div>
        );

      case TABS_KEYS.DETAILS:
        return (
          <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Director</strong>
                <span className="movie-card__details-value">{film.director}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Starring</strong>
                <span className="movie-card__details-value">
                  {getStarringList(film.starring)}
                </span>
              </p>
            </div>

            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">{getFilmDuration(film.runTime)}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">{film.genre}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">{film.releaseDate}</span>
              </p>
            </div>
          </div>
        );

      case TABS_KEYS.REVIEWS:
        const commentsInCol = Math.ceil(filmComment.length / 2);

        return (
          <div className="movie-card__reviews movie-card__row">
            <div className="movie-card__reviews-col">
              {filmComment.slice(0, commentsInCol).map((comment, index) => {
                return (
                  <div className="review" key={index}>
                    <blockquote className="review__quote">
                      <p className="review__text">{comment.comment}</p>

                      <footer className="review__details">
                        <cite className="review__author">{comment.userName}</cite>
                        <time className="review__date" dateTime={getDateTime(comment.date)}>
                          {getFullDate(comment.date)}
                        </time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">{formatRating(comment.rating)}</div>
                  </div>
                );
              })}
            </div>
            <div className="movie-card__reviews-col">
              {filmComment.slice(commentsInCol, filmComment.length).map((comment, index) => {
                return (
                  <div className="review" key={index}>
                    <blockquote className="review__quote">
                      <p className="review__text">{comment.comment}</p>

                      <footer className="review__details">
                        <cite className="review__author">{comment.userName}</cite>
                        <time className="review__date" dateTime={getDateTime(comment.date)}>
                          {getFullDate(comment.date)}
                        </time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">{formatRating(comment.rating)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
    }

    return null;
  };

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full" style={{backgroundColor: film.backgroundColor}}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header isMainPageElement={false} >
            <UserBlock authorizationStatus={authorizationStatus} />
          </Header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{film.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{film.genre}</span>
                <span className="movie-card__year">{film.releaseDate}</span>
              </p>

              <MovieCardButtonsWrapped authorizationStatus={authorizationStatus} film={film}/>
            </div>
          </div>
        </div>
        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={film.previewImage} alt="The Grand Budapest Hotel poster" width="218"
                height="327"/>
            </div>
            <div className="movie-card__desc">
              <nav className="movie-nav movie-card__nav">
                <Tabs activeTab={activeTab} onTabClick={tabClickHandler} />
              </nav>

              {_renderTab()}

            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <MovieListWrapped films={getMoreLikeThisFilm().slice(0, MORE_LIKE_THIS_FILMS)} filmNameClickHandler={filmNameClickHandler} list={MORE_LIKE_THIS_LIST} />

        <Footer isMainPageElement={false} />
      </div>
    </React.Fragment>
  );
};

MovieDetails.propTypes = {
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
  filmComment: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })),
  filmNameClickHandler: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  tabClickHandler: PropTypes.func,
  getMoreLikeThisFilm: PropTypes.func,
  formatRating: PropTypes.func,
  getTextRating: PropTypes.func,
  getStarringList: PropTypes.func,
  getDateTime: PropTypes.func,
  getFullDate: PropTypes.func,
  getFilmDuration: PropTypes.func
};

export default MovieDetails;
