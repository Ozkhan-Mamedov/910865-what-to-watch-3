import React from "react";
import PropTypes from "prop-types";

import MovieList from "../movie-list/movie-list";
import GenreList from "../genre-list/genre-list";
import Footer from "../footer/footer";
import PromoMovieCard from "../promo-movie-card/promo-movie-card";

import {MOVIE_LIST} from "../../constants";

const Main = (props) => {
  const {promoFilmData, films, filmNameClickHandler} = props;

  return (
    <React.Fragment>
      <PromoMovieCard promoFilm={promoFilmData} />

      <div className="page-content">
        <MovieList filmNameClickHandler={filmNameClickHandler} films={films} list={MOVIE_LIST} >
          <GenreList films={films} />
        </MovieList>

        <Footer />
      </div>
    </React.Fragment>
  );
};

Main.propTypes = {
  promoFilmData: PropTypes.exact({
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
  }),
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
  filmNameClickHandler: PropTypes.func.isRequired
};

export default Main;
