import React from "react";
import PropTypes from "prop-types";

import VideoPlayer from "../video-player/video-player";

import withVideoPlayerStatus from "../../hocs/withVideoPlayerStatus";

const VideoPlayerWrapped = withVideoPlayerStatus(VideoPlayer);

const SmallMovieCard = (props) => {
  const {film, filmNameClickHandler, cardHoverHandler, cardId} = props;
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

  const cardClickHandler = (evt) => {
    evt.preventDefault();
    clearTimeout(timer);
    filmNameClickHandler(film.id);
  };

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseOver={cardMouseOverHandler}
      onMouseOut={cardMouseOutHandler}
      onClick={cardClickHandler}>
      {cardId !== film.id ?
        <React.Fragment>
          <div className="small-movie-card__image">
            <img src={film.picture} alt={film.name} width="280" height="175"/>
          </div>
          <h3 className="small-movie-card__title">
            <a className="small-movie-card__link" href="movie-page.html">{film.name}</a>
          </h3>
        </React.Fragment> :
        <VideoPlayerWrapped src={film.preview} poster={film.picture}/>
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
    description: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
    previewImage: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
  }),
  filmNameClickHandler: PropTypes.func.isRequired,
  cardHoverHandler: PropTypes.func.isRequired,
  cardId: PropTypes.number,
};

export default SmallMovieCard;
