import React from "react";
import {connect} from "react-redux";

import {Operation} from "../reducer/data/reducer";
import {MovieCardButtons} from "../components/movie-card-buttons/movie-card-buttons";

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

  WithFilmAddedToWatchStatus.defaultProps = {
    isMainPageElement: false
  };

  return connect(null, mapDispatchToProps)(WithFilmAddedToWatchStatus);
};

export default withFilmAddedToWatchStatus;
