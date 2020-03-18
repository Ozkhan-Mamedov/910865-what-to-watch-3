import React from "react";
import PropTypes from "prop-types";

import SmallMovieCard from "../small-movie-card/small-movie-card";
import ShowMoreButton from "../show-more-button/show-more-button";

import {MORE_LIKE_THIS_LIST, MOVIE_LIST} from "../../constants";

const MovieList = (props) => {
  const {hoveredCard, films, filmNameClickHandler, list,
    cardsRenderNumber, incrementCardsNumber, filteredFilmsList, cardHoverHandler, children} = props;

  const _renderList = () => {
    switch (list) {
      case MOVIE_LIST:
        return (
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            {children}

            <div className="catalog__movies-list">
              {
                filteredFilmsList.slice(0, cardsRenderNumber).map((film, index) =>
                  <SmallMovieCard
                    key={index}
                    film={film}
                    filmNameClickHandler={filmNameClickHandler}
                    cardHoverHandler={cardHoverHandler}
                    cardId={hoveredCard}
                  />
                )
              }
            </div>

            {cardsRenderNumber < filteredFilmsList.length ?
              <ShowMoreButton buttonClickHandler={incrementCardsNumber} />
              : null}
          </section>
        );

      case MORE_LIKE_THIS_LIST:
        if (films.length !== 0) {
          return (
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>

              <div className="catalog__movies-list">
                {
                  films.map((film, index) =>
                    <SmallMovieCard
                      key={index}
                      film={film}
                      filmNameClickHandler={filmNameClickHandler}
                      cardHoverHandler={cardHoverHandler}
                      cardId={hoveredCard}
                    />
                  )
                }
              </div>
            </section>
          );
        } else {
          return null;
        }
    }

    return null;
  };

  return (
    _renderList()
  );
};

MovieList.propTypes = {
  hoveredCard: PropTypes.number,
  cardHoverHandler: PropTypes.func,
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
  filmNameClickHandler: PropTypes.func.isRequired,
  list: PropTypes.string.isRequired,
  cardsRenderNumber: PropTypes.number,
  incrementCardsNumber: PropTypes.func,
  children: PropTypes.element,
  filteredFilmsList: PropTypes.arrayOf(PropTypes.exact({
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
};

export default MovieList;
