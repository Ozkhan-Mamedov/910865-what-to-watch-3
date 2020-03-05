import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import MovieList from "../movie-list/movie-list";
import GenreList from "../genre-list/genre-list";
import Footer from "../footer/footer";
import PromoMovieCard from "../promo-movie-card/promo-movie-card";
import FullscreenVideoPlayer from "../fullscreen-video-player/fullscreen-video-player";

import {MOVIE_LIST} from "../../constants";
import {ActionCreator} from "../../reducer/reducer";

const Main = (props) => {
  const {promoFilmData, films, filmNameClickHandler, isPlayerActive, onExitButtonClickHandler} = props;

  return (
    <React.Fragment>
      <PromoMovieCard promoFilm={promoFilmData} />

      <div className="page-content">
        <MovieList filmNameClickHandler={filmNameClickHandler} films={films} list={MOVIE_LIST} >
          <GenreList films={films} />
        </MovieList>

        <Footer />
      </div>

      {isPlayerActive ? <FullscreenVideoPlayer film={promoFilmData} onExitButtonClickHandler={onExitButtonClickHandler} /> : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isPlayerActive: state.isPlayerActive,
  activeCard: state.activeCard,
});

const mapDispatchToProps = (dispatch) => ({
  onExitButtonClickHandler() {
    dispatch(ActionCreator.unrenderPlayer());
  }
});

Main.propTypes = {
  promoFilmData: PropTypes.exact({
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired
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
  filmNameClickHandler: PropTypes.func.isRequired,
  isPlayerActive: PropTypes.bool,
  onExitButtonClickHandler: PropTypes.func,
};

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
