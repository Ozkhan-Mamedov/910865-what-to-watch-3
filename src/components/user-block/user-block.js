import React from "react";
import PropTypes from "prop-types";

import {AUTHORIZATION_STATUS} from "../../constants";

const UserBlock = ({authorizationStatus, loginButtonClickHandler}) => {
  return (
    <div className="user-block">

      {authorizationStatus === AUTHORIZATION_STATUS.AUTH ?
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
        </div>
        : <div className="user-block">
          <a href="sign-in.html" className="user-block__link" onClick={loginButtonClickHandler}>Sign in</a>
        </div>
      }

    </div>
  );
};

UserBlock.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  loginButtonClickHandler: PropTypes.func,
};

export default UserBlock;
