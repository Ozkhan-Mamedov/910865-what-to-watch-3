import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import MovieList from "../movie-list/movie-list";
import Header from "../header/header";
import Footer from "../footer/footer";
import ErrorMessage from "../error-message/error-message";
import Tabs from "../tabs/tabs";
import MovieCardButtons from "../movie-card-buttons/movie-card-buttons";
import FullscreenVideoPlayer from "../fullscreen-video-player/fullscreen-video-player";
import UserBlock from "../user-block/user-block";

import {
  MINUTES_IN_HOUR,
  TABS_KEYS,
  MONTH_KEYS,
  MONTH_SUBSTR,
  DAY_SUBSTR,
  YEAR_SUBSTR,
  MORE_LIKE_THIS_LIST, MORE_LIKE_THIS_FILMS
} from "../../constants";
import {ActionCreator} from "../../reducer/app/action-creator";
import {getActiveCard, getPlayerStatus} from "../../reducer/app/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";

class MovieDetails extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: TABS_KEYS.OVERVIEW
    };

    this.tabClickHandler = this.tabClickHandler.bind(this);
  }

  getMoreLikeThisFilm() {
    const {film: targetFilm, films} = this.props;
    const {genre} = targetFilm;

    return films.filter((film) => film.genre === genre && targetFilm !== film);
  }

  tabClickHandler(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  getDateTime(date) {
    const mseconds = Date.parse(date);

    return new Date(mseconds).toLocaleDateString().replace(/\./g, `-`);
  }

  getFullDate(date) {
    const mseconds = Date.parse(date);
    const dateString = new Date(mseconds).toDateString();
    const year = dateString.substr(YEAR_SUBSTR.START, YEAR_SUBSTR.LENGTH);
    const currentMonthKey = dateString.substr(MONTH_SUBSTR.START, MONTH_SUBSTR.LENGTH);
    const month = MONTH_KEYS.find((monthKey) => monthKey.key === currentMonthKey).month;
    const day = dateString.substr(DAY_SUBSTR.START, DAY_SUBSTR.LENGTH);

    return `${month} ${day[0] === `0` ? day[day.length - 1] : day}, ${year}`;
  }

  getTextRating(num) {
    if (num < 3) {
      return `Bad`;
    }
    if ((num >= 3) && (num < 5)) {
      return `Normal`;
    }
    if ((num >= 5) && (num < 8)) {
      return `Good`;
    }
    if ((num >= 8) && (num < 10)) {
      return `Very good`;
    }
    if (num === 10) {
      return `Awesome`;
    }

    return null;
  }

  formatRating(num) {
    const stringNumber = num.toString();

    return stringNumber.replace(`.`, `,`);
  }

  getFilmDuration(duration) {
    const hours = Math.floor(duration / MINUTES_IN_HOUR);
    const minutes = duration - (hours * MINUTES_IN_HOUR);

    return `${hours === 0 ? `` : hours + `h `}${minutes === 0 ? `` : minutes + `m`}`;
  }

  getStarringList(actors) {
    return actors.map((actor, index, arr) => {
      if (index < arr.length - 1) {
        return (
          <React.Fragment key={index}>
            {actor}, <br/>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={index}>
            {actor}
          </React.Fragment>
        );
      }
    });
  }

  _renderTab() {
    const {activeTab} = this.state;
    const {film, filmComment} = this.props;

    switch (activeTab) {
      case TABS_KEYS.OVERVIEW:
        return (
          <div className="movie-card__desc">
            <div className="movie-rating">
              <div className="movie-rating__score">{this.formatRating(film.ratingsNumber)}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{this.getTextRating(film.ratingsNumber)}</span>
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
                  {this.getStarringList(film.starring)}
                </span>
              </p>
            </div>

            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">{this.getFilmDuration(film.runTime)}</span>
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
                        <time className="review__date" dateTime={this.getDateTime(comment.date)}>
                          {this.getFullDate(comment.date)}
                        </time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">{this.formatRating(comment.rating)}</div>
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
                        <time className="review__date" dateTime={this.getDateTime(comment.date)}>
                          {this.getFullDate(comment.date)}
                        </time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">{this.formatRating(comment.rating)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
    }

    return null;
  }

  render() {
    const {film, filmNameClickHandler, isPlayerActive,
      onExitButtonClickHandler, authorizationStatus,
      loginButtonClickHandler} = this.props;
    const {activeTab} = this.state;

    return (
      film !== undefined ?
        <React.Fragment>
          <section className="movie-card movie-card--full" style={{backgroundColor: film.backgroundColor}}>
            <div className="movie-card__hero">
              <div className="movie-card__bg">
                <img src={film.backgroundImage} alt={film.name}/>
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <Header isMainPageElement={false} >
                <UserBlock authorizationStatus={authorizationStatus} loginButtonClickHandler={loginButtonClickHandler}/>
              </Header>

              <div className="movie-card__wrap">
                <div className="movie-card__desc">
                  <h2 className="movie-card__title">{film.name}</h2>
                  <p className="movie-card__meta">
                    <span className="movie-card__genre">{film.genre}</span>
                    <span className="movie-card__year">{film.releaseDate}</span>
                  </p>

                  <MovieCardButtons isMainPageElement={true} />
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
                    <Tabs activeTab={activeTab} onTabClick={this.tabClickHandler} />
                  </nav>

                  {this._renderTab()}

                </div>
              </div>
            </div>
          </section>

          <div className="page-content">
            <MovieList films={this.getMoreLikeThisFilm().slice(0, MORE_LIKE_THIS_FILMS - 1)} filmNameClickHandler={filmNameClickHandler} list={MORE_LIKE_THIS_LIST} />

            <Footer isMainPageElement={false} />
          </div>
          {isPlayerActive ? <FullscreenVideoPlayer film={film} onExitButtonClickHandler={onExitButtonClickHandler} /> : null}
        </React.Fragment>
        : <ErrorMessage errorMessage={`Film not found!`}/>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCard: getActiveCard(state),
  isPlayerActive: getPlayerStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onExitButtonClickHandler() {
    dispatch(ActionCreator.unrenderPlayer());
  }
});

MovieDetails.propTypes = {
  films: PropTypes.arrayOf(PropTypes.exact({
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
  })),
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
  isPlayerActive: PropTypes.bool,
  onExitButtonClickHandler: PropTypes.func,
  authorizationStatus: PropTypes.string.isRequired,
  loginButtonClickHandler: PropTypes.func.isRequired,
};

export {MovieDetails};
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
