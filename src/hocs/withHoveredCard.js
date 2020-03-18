import React from "react";

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

      return <Component {...this.props} hoveredCard={hoveredCard} cardHoverHandler={this.cardHoverHandler} />;
    }
  }

  return WithHoveredCard;
};

export default withHoveredCard;
