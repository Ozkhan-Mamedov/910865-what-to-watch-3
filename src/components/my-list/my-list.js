import React from "react";
import PropTypes from "prop-types";

import Header from "../header/header";
import UserBlock from "../user-block/user-block";
import Footer from "../footer/footer";
import {MovieList} from "../movie-list/movie-list";

import withHoveredCard from "../../hocs/withHoveredCard";

import {HEADER_TYPE, MOVIE_LIST} from "../../constants";

const MovieListWrapped = withHoveredCard(MovieList);

const MyList = (props) => {
  const {authorizationStatus, filmNameClickHandler, films} = props;

  return (
    <div className="user-page">
      <Header type={HEADER_TYPE.USER_PAGE} isMainPageElement={false}>
        <React.Fragment>
          <h1 className="page-title user-page__title">My list</h1>
          <UserBlock authorizationStatus={authorizationStatus} />
        </React.Fragment>
      </Header>

      <MovieListWrapped filteredFilmsList={films} list={MOVIE_LIST} filmNameClickHandler={filmNameClickHandler}/>

      <Footer isMainPageElement={false} />
    </div>
  );
};

MyList.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  filmNameClickHandler: PropTypes.func.isRequired,
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
  }))
};

export default MyList;
