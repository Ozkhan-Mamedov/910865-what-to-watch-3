import React from "react";
import PropTypes from "prop-types";

import Footer from "../footer/footer";
import Header from "../header/header";

import {HEADER_TYPE} from "../../constants";

const ErrorMessage = ({errorMessage}) => {
  return (
    <React.Fragment>
      <div className="user-page">
        <Header type={HEADER_TYPE.USER_PAGE} customStyling={{marginBottom: `30vh`}} />

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
