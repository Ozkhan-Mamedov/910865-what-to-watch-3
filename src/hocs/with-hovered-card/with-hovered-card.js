import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getCardsRenderNumber} from "../../reducer/app/selectors";
import {getFilteredFilmList} from "../../reducer/data/selectors";
import {ActionCreator as AppActionCreator} from "../../reducer/app/action-creator";
import {Operation as DataOperation} from "../../reducer/data/reducer";
import history from "../../history";
import {AppRoute} from "../../constants";

const withHoveredCard = (Component) => {
  class WithHoveredCard extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        hoveredCard: -1
      };

      this.handleCardHover = this.handleCardHover.bind(this);
      this.handleFilmCardClick = this.handleFilmCardClick.bind(this);
    }

    handleCardHover(id) {
      const {hoveredCard} = this.state;

      if (id !== hoveredCard) {
        this.setState({
          hoveredCard: id,
        });
      }
    }

    handleFilmCardClick(filmName) {
      const {films, handleCardClick} = this.props;
      const filmIndex = films.findIndex((film) => film.id === filmName);

      handleCardClick(filmIndex);
      history.push(`${AppRoute.FILM}/${filmIndex}`);
    }

    render() {
      const {hoveredCard} = this.state;

      return <Component {...this.props}
        hoveredCard={hoveredCard}
        onCardHover={this.handleCardHover}
        onFilmCardClick={this.handleFilmCardClick}
      />;
    }
  }

  const mapStateToProps = (state) => ({
    cardsRenderNumber: getCardsRenderNumber(state),
    filteredFilmsList: getFilteredFilmList(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    increaseCardsNumber() {
      dispatch(AppActionCreator.increaseCardsNumber());
    },
    handleCardClick(id) {
      dispatch(AppActionCreator.changeActiveCard(id));
      dispatch(DataOperation.getCommentsList(id));
    },
  });

  WithHoveredCard.propTypes = {
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
    handleCardClick: PropTypes.func.isRequired
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithHoveredCard);
};

export default withHoveredCard;
