import React from "react";
import PropTypes from "prop-types";

import {GENRES, ALL_GENRES, MAX_GENRE_NUMBER} from "../../constants";

const GenreList = ({films, activeGenre = GENRES.ALL_GENRES}) => {
  const getGenres = (filmList) => {
    const genres = new Set().add(ALL_GENRES);

    filmList.forEach((film) => {
      genres.add(film.genre);
    });

    return genres;
  };

  const formatGenres = (genres) => {
    return Array.from(genres).map((genre) => GENRES[genre.toUpperCase()]);
  };

  const genres = formatGenres(getGenres(films));

  return (
    <ul className="catalog__genres-list">
      {
        genres.slice(0, MAX_GENRE_NUMBER).map((genre, index) => (
          <li className={`catalog__genres-item ${genre === activeGenre ? `catalog__genres-item--active` : ``}`} key={index}>
            <a href="#" className="catalog__genres-link">{genre}</a>
          </li>
        ))
      }
    </ul>
  );
};

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
    description: PropTypes.arrayOf(PropTypes.string),
    preview: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
  })),
  activeGenre: PropTypes.string,
};

export default GenreList;
