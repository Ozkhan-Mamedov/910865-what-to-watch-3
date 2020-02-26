import React from "react";
import PropTypes from "prop-types";

import ErrorMessage from "../error-message/error-message";
import Tabs from "../tabs/tabs";

import {MINUTES_IN_HOUR, TABS_KEYS} from "../../constants";

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: TABS_KEYS.REVIEWS
    };
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
    const {film} = this.props;

    switch (activeTab) {
      case TABS_KEYS.OVERVIEW:
        return (
          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt={film.name} width="218"
                  height="327"/>
              </div>

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <Tabs activeTab={activeTab} />
                </nav>

                <div className="movie-rating">
                  <div className="movie-rating__score">{this.formatRating(film.ratingScore)}</div>
                  <p className="movie-rating__meta">
                    <span className="movie-rating__level">{this.getTextRating(film.ratingScore)}</span>
                    <span className="movie-rating__count">{film.ratingsNumber} ratings</span>
                  </p>
                </div>

                <div className="movie-card__text">
                  {
                    film.description.map((it, index) =>
                      <p key={index}>{it}</p>
                    )
                  }

                  <p className="movie-card__director"><strong>Director: {film.director}</strong></p>

                  <p className="movie-card__starring"><strong>Starring: {film.starring.join(`, `)}
                    {` and other`}
                  </strong></p>
                </div>
              </div>
            </div>
          </div>
        );

      case TABS_KEYS.DETAILS:
        return (
          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt={film.name} width="218"
                  height="327"/>
              </div>

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <Tabs activeTab={activeTab} />
                </nav>

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
              </div>
            </div>
          </div>
        );

      case TABS_KEYS.REVIEWS:
        return (
          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218"
                  height="327"/>
              </div>

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <Tabs activeTab={activeTab} />
                </nav>

                <div className="movie-card__reviews movie-card__row">
                  <div className="movie-card__reviews-col">
                    <div className="review">
                      <blockquote className="review__quote">
                        <p className="review__text">Discerning travellers and Wes Anderson fans will luxuriate in the
                          glorious Mittel-European kitsch of one of the director&apos;s funniest and most exquisitely
                          designed movies in years.</p>

                        <footer className="review__details">
                          <cite className="review__author">Kate Muir</cite>
                          <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                        </footer>
                      </blockquote>

                      <div className="review__rating">8,9</div>
                    </div>

                    <div className="review">
                      <blockquote className="review__quote">
                        <p className="review__text">Anderson&apos;s films are too precious for some, but for those of us
                          willing to lose ourselves in them, they&apos;re a delight. &apos;The Grand Budapest Hotel&apos; is no
                          different, except that he has added a hint of gravitas to the mix, improving the recipe.</p>

                        <footer className="review__details">
                          <cite className="review__author">Bill Goodykoontz</cite>
                          <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                        </footer>
                      </blockquote>

                      <div className="review__rating">8,0</div>
                    </div>

                    <div className="review">
                      <blockquote className="review__quote">
                        <p className="review__text">I didn&apos;t find it amusing, and while I can appreciate the creativity,
                          it&apos;s an hour and 40 minutes I wish I could take back.</p>

                        <footer className="review__details">
                          <cite className="review__author">Amanda Greever</cite>
                          <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                        </footer>
                      </blockquote>

                      <div className="review__rating">8,0</div>
                    </div>
                  </div>
                  <div className="movie-card__reviews-col">
                    <div className="review">
                      <blockquote className="review__quote">
                        <p className="review__text">The mannered, madcap proceedings are often delightful, occasionally
                          silly, and here and there, gruesome and/or heartbreaking.</p>

                        <footer className="review__details">
                          <cite className="review__author">Matthew Lickona</cite>
                          <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                        </footer>
                      </blockquote>

                      <div className="review__rating">7,2</div>
                    </div>

                    <div className="review">
                      <blockquote className="review__quote">
                        <p className="review__text">It is certainly a magical and childlike way of storytelling, even if
                          the content is a little more adult.</p>

                        <footer className="review__details">
                          <cite className="review__author">Paula Fleri-Soler</cite>
                          <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                        </footer>
                      </blockquote>

                      <div className="review__rating">7,6</div>
                    </div>

                    <div className="review">
                      <blockquote className="review__quote">
                        <p className="review__text">It is certainly a magical and childlike way of storytelling, even if
                          the content is a little more adult.</p>

                        <footer className="review__details">
                          <cite className="review__author">Paula Fleri-Soler</cite>
                          <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                        </footer>
                      </blockquote>

                      <div className="review__rating">7,0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }

    return null;
  }

  render() {
    const {film} = this.props;

    return (
      film !== undefined ?
        <React.Fragment>
          <section className="movie-card movie-card--full">
            <div className="movie-card__hero">
              <div className="movie-card__bg">
                <img src="img/bg-the-grand-budapest-hotel.jpg" alt={film.name}/>
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <header className="page-header movie-card__head">
                <div className="logo">
                  <a href="main.html" className="logo__link">
                    <span className="logo__letter logo__letter--1">W</span>
                    <span className="logo__letter logo__letter--2">T</span>
                    <span className="logo__letter logo__letter--3">W</span>
                  </a>
                </div>

                <div className="user-block">
                  <div className="user-block__avatar">
                    <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                  </div>
                </div>
              </header>

              <div className="movie-card__wrap">
                <div className="movie-card__desc">
                  <h2 className="movie-card__title">{film.name}</h2>
                  <p className="movie-card__meta">
                    <span className="movie-card__genre">{film.genre}</span>
                    <span className="movie-card__year">{film.releaseDate}</span>
                  </p>

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
                    <a href="add-review.html" className="btn movie-card__button">Add review</a>
                  </div>
                </div>
              </div>
            </div>

            {this._renderTab()}
          </section>

          <div className="page-content">
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>

              <div className="catalog__movies-list">
                <article className="small-movie-card catalog__movies-card">
                  <div className="small-movie-card__image">
                    <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg"
                      alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175"/>
                  </div>
                  <h3 className="small-movie-card__title">
                    <a className="small-movie-card__link" href="movie-page.html">Fantastic Beasts: The Crimes of
                      Grindelwald</a>
                  </h3>
                </article>

                <article className="small-movie-card catalog__movies-card">
                  <div className="small-movie-card__image">
                    <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175"/>
                  </div>
                  <h3 className="small-movie-card__title">
                    <a className="small-movie-card__link" href="movie-page.html">Bohemian Rhapsody</a>
                  </h3>
                </article>

                <article className="small-movie-card catalog__movies-card">
                  <div className="small-movie-card__image">
                    <img src="img/macbeth.jpg" alt="Macbeth" width="280" height="175"/>
                  </div>
                  <h3 className="small-movie-card__title">
                    <a className="small-movie-card__link" href="movie-page.html">Macbeth</a>
                  </h3>
                </article>

                <article className="small-movie-card catalog__movies-card">
                  <div className="small-movie-card__image">
                    <img src="img/aviator.jpg" alt="Aviator" width="280" height="175"/>
                  </div>
                  <h3 className="small-movie-card__title">
                    <a className="small-movie-card__link" href="movie-page.html">Aviator</a>
                  </h3>
                </article>
              </div>
            </section>

            <footer className="page-footer">
              <div className="logo">
                <a href="main.html" className="logo__link logo__link--light">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
              </div>

              <div className="copyright">
                <p>© 2019 What to watch Ltd.</p>
              </div>
            </footer>
          </div>
        </React.Fragment>
        : <ErrorMessage/>
    );
  }
}

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
    description: PropTypes.arrayOf(PropTypes.string),
    preview: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
  }),
};

export default MovieDetails;
