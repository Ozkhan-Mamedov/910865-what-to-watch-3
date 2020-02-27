import React from "react";
import PropTypes from "prop-types";

import VideoPlayer from "../video-player/video-player";

const SmallMovieCard = (props) => {
  const {film, filmNameClickHandler, cardHoverHandler, activeCard} = props;
  let timer;

  const cardMouseOverHandler = () => {
    timer = setTimeout(() => {
      cardHoverHandler(film.id);
    }, 1000);
  };

  const cardMouseOutHandler = () => {
    clearTimeout(timer);
    cardHoverHandler(-1);
  };

  const cardClickHandler = () => {
    clearTimeout(timer);
    filmNameClickHandler(film.name);
  };

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseOver={cardMouseOverHandler}
      onMouseOut={cardMouseOutHandler}
      onClick={cardClickHandler}>
      {activeCard !== film.id ?
        <React.Fragment>
          <div className="small-movie-card__image">
            <img src={film.picture} alt={film.name} width="280" height="175"/>
          </div>
          <h3 className="small-movie-card__title">
            <a className="small-movie-card__link" href="movie-page.html">{film.name}</a>
          </h3>
        </React.Fragment> :
        <VideoPlayer src={film.preview} poster={film.picture}/>
      }
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
    preview: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
  }),
  filmNameClickHandler: PropTypes.func.isRequired,
  cardHoverHandler: PropTypes.func.isRequired,
  activeCard: PropTypes.number.isRequired,
};

export default SmallMovieCard;
