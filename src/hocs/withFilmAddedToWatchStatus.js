import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {Operation} from "../reducer/data/reducer";

const withFilmAddedToWatchStatus = (Component) => {
  class WithFilmAddedToWatchStatus extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isFilmAddedToWatch: this.props.film.isFavorite,
      };

      this.onAddToWatchButtonClick = this.onAddToWatchButtonClick.bind(this);
    }

    onAddToWatchButtonClick() {
      const {isFilmAddedToWatch} = this.state;
      const {changeFavoriteFilmStatus, film, updateData} = this.props;

      if (!isFilmAddedToWatch) {
        this.setState({
          isFilmAddedToWatch: true,
        });
        changeFavoriteFilmStatus(film.id, 1, updateData);
      } else {
        this.setState({
          isFilmAddedToWatch: false,
        });
        changeFavoriteFilmStatus(film.id, 0, updateData);
      }
    }

    render() {
      const {isFilmAddedToWatch} = this.state;

      return <Component {...this.props}
        isFilmAddedToWatch={isFilmAddedToWatch}
        onAddToWatchButtonClick={this.onAddToWatchButtonClick}
      />;
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    changeFavoriteFilmStatus(id, status, resolver) {
      dispatch(Operation.changeFavoriteFilmStatus(id, status, resolver));
    },
    updateData() {
      dispatch(Operation.getFilmList());
      dispatch(Operation.getPromoMovieData());
      dispatch(Operation.getFavoriteFilms());
    }
  });

  WithFilmAddedToWatchStatus.propTypes = {
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
    changeFavoriteFilmStatus: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired,
  };

  return connect(null, mapDispatchToProps)(WithFilmAddedToWatchStatus);
};

export default withFilmAddedToWatchStatus;
