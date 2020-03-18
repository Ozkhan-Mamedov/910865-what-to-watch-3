import React from "react";
import {connect} from "react-redux";

import {getCardsRenderNumber} from "../reducer/app/selectors";
import {getFilteredFilmList} from "../reducer/data/selectors";
import {ActionCreator} from "../reducer/app/action-creator";

const withHoveredCard = (Component) => {
  class WithHoveredCard extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        hoveredCard: -1
      };

      this.cardHoverHandler = this.cardHoverHandler.bind(this);
    }

    cardHoverHandler(id) {
      const {hoveredCard} = this.state;

      if (id !== hoveredCard) {
        this.setState({
          hoveredCard: id,
        });
      }
    }

    render() {
      const {hoveredCard} = this.state;

      return <Component {...this.props}
        hoveredCard={hoveredCard}
        cardHoverHandler={this.cardHoverHandler}
      />;
    }
  }

  const mapStateToProps = (state) => ({
    cardsRenderNumber: getCardsRenderNumber(state),
    filteredFilmsList: getFilteredFilmList(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    incrementCardsNumber() {
      dispatch(ActionCreator.incrementCardsNumber());
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithHoveredCard);
};

export default withHoveredCard;
