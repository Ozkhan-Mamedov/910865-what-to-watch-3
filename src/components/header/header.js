import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import Logo from "../logo/logo";

import {AppRoute, HeaderType} from "../../constants";

const Header = ({isMainPageElement, type, children, customStyling}) => {
  return (
    <header className={`page-header movie-card__head ${type}`} style={customStyling}>
      <div className="logo">
        {
          isMainPageElement ?
            <a href={null} className="logo__link">
              <Logo />
            </a>
            :
            <Link to={AppRoute.ROOT} className="logo__link">
              <Logo />
            </Link>
        }
      </div>

      {children}

    </header>
  );
};

Header.defaultProps = {
  isMainPageElement: true,
  type: HeaderType.MOVIE_CARD,
  customStyling: {},
};

Header.propTypes = {
  isMainPageElement: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  customStyling: PropTypes.shape(),
};

export default Header;
