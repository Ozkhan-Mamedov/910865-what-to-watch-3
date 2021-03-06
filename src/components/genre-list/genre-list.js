import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator as AppActionCreator} from "../../reducer/app/action-creator";
import {Genre, GenreKey, ALL_GENRES, MAX_GENRE_NUMBER} from "../../constants";
import {getGenre} from "../../reducer/app/selectors";

const GenreList = ({films, changeFilterByGenre, genre = ALL_GENRES, decreaseCardsNumber}) => {
  const getGenres = (filmList) => {
    const genres = new Set().add(ALL_GENRES);

    filmList.forEach((film) => {
      genres.add(film.genre);
    });

    return genres;
  };

  const formatGenres = (genres) => {
    return Array.from(genres).map((currentGenre) => Genre[currentGenre.toUpperCase()]);
  };

  const handleGenreClick = (evt) => {
    evt.preventDefault();
    for (genre in Genre) {
      if (evt.target.textContent === Genre[genre]) {
        decreaseCardsNumber();
        changeFilterByGenre(GenreKey[genre]);
      }
    }
  };

  const genres = formatGenres(getGenres(films));

  return (
    <ul className="catalog__genres-list">
      {
        genres.slice(0, MAX_GENRE_NUMBER).map((currentGenre, index) => (
          <li
            className={`catalog__genres-item ${currentGenre === Genre[genre.toUpperCase()] ? `catalog__genres-item--active` : ``}`}
            key={index}
            onClick={handleGenreClick}>
            <a href="#" className="catalog__genres-link">{currentGenre}</a>
          </li>
        ))
      }
    </ul>
  );
};

const mapStateToProps = (state) => ({
  genre: getGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeFilterByGenre(genre) {
    dispatch(AppActionCreator.changeFilter(genre));
  },
  decreaseCardsNumber() {
    dispatch(AppActionCreator.decreaseCardsNumber());
  },
});

GenreList.propTypes = {
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
  changeFilterByGenre: PropTypes.func,
  genre: PropTypes.string,
  decreaseCardsNumber: PropTypes.func,
};

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
