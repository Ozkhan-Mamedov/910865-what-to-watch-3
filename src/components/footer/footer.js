import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {APP_ROUTES} from "../../constants";

const Footer = ({isMainPageElement}) => {
  return (
    <footer className="page-footer">
      <div className="logo">
        {
          isMainPageElement ?
            <a href={null} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
            :
            <Link to={APP_ROUTES.ROOT} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
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
