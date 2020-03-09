import React from "react";
import PropTypes from "prop-types";

import {HEADER_TYPE} from "../../constants";

const Header = ({isMainPageElement, type, children, customStyling}) => {
  return (
    <header className={`page-header movie-card__head ${type}`} style={customStyling}>
      <div className="logo">
        <a href={isMainPageElement ? null : `main.html`} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      {children}

    </header>
  );
};

Header.defaultProps = {
  isMainPageElement: true,
  type: HEADER_TYPE.MOVIE_CARD,
  customStyling: {},
};

Header.propTypes = {
  isMainPageElement: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.element,
  customStyling: PropTypes.shape(),
};

export default Header;
