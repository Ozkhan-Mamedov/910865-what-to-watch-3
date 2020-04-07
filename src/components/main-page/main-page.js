import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import MovieList from "../movie-list/movie-list";
import GenreList from "../genre-list/genre-list";
import Footer from "../footer/footer";
import PromoMovieCard from "../promo-movie-card/promo-movie-card";

import withHoveredCard from "../../hocs/with-hovered-card/with-hovered-card";

import {MOVIE_LIST} from "../../constants";
import {getFilms, getPromoFilm} from "../../reducer/data/selectors";

const MovieListWrapped = withHoveredCard(MovieList);

const MainPage = (props) => {
  const {promoFilm, films} = props;

  if (promoFilm && films) {
    return (
      <React.Fragment>
        <PromoMovieCard promoFilm={promoFilm}/>

        <div className="page-content">
          <MovieListWrapped films={films} list={MOVIE_LIST}>
            <GenreList films={films}/>
          </MovieListWrapped>

          <Footer/>
        </div>

      </React.Fragment>
    );
  }

  return null;
};

const mapStateToProps = (state) => ({
  promoFilm: getPromoFilm(state),
  films: getFilms(state),
});

MainPage.propTypes = {
  promoFilm: PropTypes.exact({
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
};

export {MainPage};
export default connect(mapStateToProps)(MainPage);
