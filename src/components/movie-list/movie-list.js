import React from "react";
import PropTypes from "prop-types";

import SmallMovieCard from "../small-movie-card/small-movie-card";
import {MORE_LIKE_THIS_LIST, MOVIE_LIST} from "../../constants";

class MovieList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: -1
    };

    this.cardHoverHandler = this.cardHoverHandler.bind(this);
  }

  cardHoverHandler(id) {
    if (id !== this.state.activeCard) {
      this.setState({
        activeCard: id,
      });
    }
  }

  _renderList() {
    const {films, filmNameClickHandler, list} = this.props;

    switch (list) {
      case MOVIE_LIST:
        return (
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            {this.props.children}

            <div className="catalog__movies-list">
              {
                films.map((film, index) =>
                  <SmallMovieCard
                    key={index}
                    film={film}
                    filmNameClickHandler={filmNameClickHandler}
                    cardHoverHandler={this.cardHoverHandler}
                    activeCard={this.state.activeCard}
                  />
                )
              }
            </div>

            <div className="catalog__more">
              <button className="catalog__button" type="button">Show more</button>
            </div>
          </section>
        );

      case MORE_LIKE_THIS_LIST:
        return (
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <div className="catalog__movies-list">
              {
                films.map((film, index) =>
                  <SmallMovieCard
                    key={index}
                    film={film}
                    filmNameClickHandler={filmNameClickHandler}
                    cardHoverHandler={this.cardHoverHandler}
                    activeCard={this.state.activeCard}
                  />
                )
              }
            </div>
          </section>
        );
    }

    return null;
  }

  render() {
    return (
      this._renderList()
    );
  }
}

MovieList.propTypes = {
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
  list: PropTypes.string.isRequired,
  children: PropTypes.element
};

export default MovieList;
