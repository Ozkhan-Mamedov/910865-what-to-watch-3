import React from "react";
import PropTypes from "prop-types";

import Footer from "../footer/footer";

const ErrorMessage = ({errorMessage}) => {
  return (
    <React.Fragment>
      <div className="user-page">
        <header className="page-header user-page__head" style={{marginBottom: `30vh`}}>
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
        </header>

        <div className="sign-in__message" style={{minHeight: `33vh`}}>
          <p style={{fontSize: `44px`, textAlign: `center`}}>{errorMessage}</p>
        </div>

        <Footer />
      </div>
    </React.Fragment>
  );
};

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;
