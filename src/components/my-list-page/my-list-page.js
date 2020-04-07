import React from "react";
import PropTypes from "prop-types";

import Header from "../header/header";
import UserBlock from "../user-block/user-block";
import Footer from "../footer/footer";
import MovieList from "../movie-list/movie-list";

import {HeaderType, MOVIE_LIST} from "../../constants";

const MyListPage = (props) => {
  const {authorizationStatus, onFilmCardClick, films, onCardHover, hoveredCard} = props;

  return (
    <div className="user-page">
      <Header type={HeaderType.USER_PAGE} isMainPageElement={false}>
        <h1 className="page-title user-page__title">My list</h1>
        <UserBlock authorizationStatus={authorizationStatus} />
      </Header>

      <MovieList
        filteredFilmsList={films}
        list={MOVIE_LIST}
        onFilmCardClick={onFilmCardClick}
        hoveredCard={hoveredCard}
        onCardHover={onCardHover}
      />

      <Footer isMainPageElement={false} />
    </div>
  );
};

MyListPage.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  onFilmCardClick: PropTypes.func.isRequired,
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
  onCardHover: PropTypes.func,
  hoveredCard: PropTypes.number,
};

export default MyListPage;
