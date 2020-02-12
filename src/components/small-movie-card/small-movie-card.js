import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {film, filmNameClickHandler, cardHoverHandler} = props;

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseOver={() => cardHoverHandler(film.id)}
      onMouseOut={() => cardHoverHandler(-1)}>
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
    genre: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }),
  filmNameClickHandler: PropTypes.func.isRequired,
  cardHoverHandler: PropTypes.func.isRequired
};

export default SmallMovieCard;
