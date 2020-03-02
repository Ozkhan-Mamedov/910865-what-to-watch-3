import React from "react";
import PropTypes from "prop-types";

const ShowMoreButton = ({buttonClickHandler}) => {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={buttonClickHandler}>Show more</button>
    </div>
  );
};

ShowMoreButton.propTypes = {
  buttonClickHandler: PropTypes.func.isRequired,
};

export default ShowMoreButton;
