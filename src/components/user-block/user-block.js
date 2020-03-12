import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {APP_ROUTES, AUTHORIZATION_STATUS} from "../../constants";

const UserBlock = ({authorizationStatus}) => {
  return (
    <div className="user-block">

      {authorizationStatus === AUTHORIZATION_STATUS.AUTH ?
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
        </div>
        :
        <div className="user-block">
          <Link className="user-block__link" to={APP_ROUTES.LOGIN}>Sign in</Link>
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