import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import SmallMovieCard from "../small-movie-card/small-movie-card";
import ShowMoreButton from "../show-more-button/show-more-button";

import {ALL_GENRES, MORE_LIKE_THIS_LIST, MOVIE_LIST} from "../../constants";
import {ActionCreator} from "../../reducer/reducer";

class MovieList extends React.PureComponent {
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
    const {films, filmNameClickHandler, list, cardsRenderNumber, incrementCardsNumber,
      activeGenre} = this.props;

    switch (list) {
      case MOVIE_LIST:
        const filteredList = films.filter((film) => {
          if (activeGenre === ALL_GENRES) {
            return film.genre;
          }

          return film.genre === activeGenre;
        });

        return (
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            {this.props.children}

            <div className="catalog__movies-list">
              {
                filteredList.slice(0, cardsRenderNumber).map((film, index) =>
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

            {cardsRenderNumber < filteredList.length ?
              <ShowMoreButton buttonClickHandler={incrementCardsNumber} />
              : null}
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

const mapStateToProps = (state) => ({
  cardsRenderNumber: state.cardsRenderNumber,
  activeGenre: state.genre,
});

const mapDispatchToProps = (dispatch) => ({
  incrementCardsNumber() {
    dispatch(ActionCreator.incrementCardsNumber());
  },
});

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
  cardsRenderNumber: PropTypes.number,
  incrementCardsNumber: PropTypes.func,
  children: PropTypes.element,
  activeGenre: PropTypes.string
};

export {MovieList};
export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
