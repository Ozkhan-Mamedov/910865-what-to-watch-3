import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import Logo from "../logo/logo";

import {AppRoute} from "../../constants";

const Footer = ({isMainPageElement}) => {
  return (
    <footer className="page-footer">
      <div className="logo">
        {
          isMainPageElement ?
            <a href={null} className="logo__link logo__link--light">
              <Logo />
            </a>
            :
            <Link to={AppRoute.ROOT} className="logo__link logo__link--light">
              <Logo />
            </Link>
        }
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  isMainPageElement: true
};

Footer.propTypes = {
  isMainPageElement: PropTypes.bool.isRequired
};

export default Footer;
