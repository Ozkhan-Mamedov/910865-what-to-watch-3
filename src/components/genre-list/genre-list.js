import React from "react";
import PropTypes from "prop-types";

import {GENRES, ALL_GENRES, MAX_GENRE_NUMBER} from "../../constants";

const GenreList = ({films, activeGenre = GENRES.ALL_GENRES}) => {
  const getGenres = (filmList) => {
    const genres = new Set().add(ALL_GENRES);

    filmList.forEach((it) => {
      genres.add(it.genre);
    });

    return genres;
  };

  const formatGenres = (genres) => {
    const formattedGenres = [];

    genres.forEach((genre) => {
      formattedGenres.push(GENRES[genre.toUpperCase()]);
    });

    return formattedGenres;
  };

  const genres = formatGenres(getGenres(films));

  return (
    <ul className="catalog__genres-list">
      {
        genres.map((genre, index) => {
          if (index < MAX_GENRE_NUMBER) {
            return (
              <li className={`catalog__genres-item ${genre === activeGenre ? `catalog__genres-item--active` : ``}`} key={index}>
                <a href="#" className="catalog__genres-link">{genre}</a>
              </li>
            );
          }

          return null;
        })
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
  })),
  activeGenre: PropTypes.string,
};

export default GenreList;
