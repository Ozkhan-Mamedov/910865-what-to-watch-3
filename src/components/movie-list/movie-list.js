import React from "react";
import PropTypes from "prop-types";

import SmallMovieCard from "../small-movie-card/small-movie-card";

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

  render() {
    const {films, filmNameClickHandler} = this.props;

    return (
      <div className="catalog__movies-list">
        {
          films.map((film, index) =>
            <SmallMovieCard
              film={film}
              key={index}
              filmNameClickHandler={filmNameClickHandler}
              cardHoverHandler={this.cardHoverHandler}
            />
          )
        }
      </div>
    );
  }
}

MovieList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
  filmNameClickHandler: PropTypes.func.isRequired
};

export default MovieList;
