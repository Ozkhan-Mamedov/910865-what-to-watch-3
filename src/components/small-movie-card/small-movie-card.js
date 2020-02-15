import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {film, filmNameClickHandler, cardHoverHandler} = props;

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseOver={() => cardHoverHandler(film.id)}
      onMouseOut={() => cardHoverHandler(-1)}

    >
      <div className="small-movie-card__image">
        <img src={film.picture} alt={film.name} width="280" height="175"
          onClick={() => {

            filmNameClickHandler(film.name);
          }}/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html"
          onClick={(evt) => {
            evt.preventDefault();
            filmNameClickHandler(film.name);
          }}>{film.name}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
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
  }),
  filmNameClickHandler: PropTypes.func.isRequired,
  cardHoverHandler: PropTypes.func.isRequired
};

export default SmallMovieCard;
