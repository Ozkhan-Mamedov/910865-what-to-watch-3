import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {film, filmNameClickHandler} = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={film.picture} alt={film.name} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html" onClick={filmNameClickHandler}>{film.name}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  film: PropTypes.exact({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired
  }),
  filmNameClickHandler: PropTypes.func.isRequired
};

export default SmallMovieCard;
