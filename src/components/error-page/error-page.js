import React from "react";
import PropTypes from "prop-types";

import Footer from "../footer/footer";
import Header from "../header/header";

import {HeaderType} from "../../constants";

const ErrorPage = ({errorMessage}) => {
  return (
    <div className="user-page">
      <Header type={HeaderType.USER_PAGE} customStyling={{marginBottom: `30vh`}} />

      <div className="sign-in__message" style={{minHeight: `33vh`}}>
        <p style={{fontSize: `44px`, textAlign: `center`}}>{errorMessage}</p>
      </div>

      <Footer />
    </div>
  );
};

ErrorPage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorPage;
