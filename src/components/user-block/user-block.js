import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {AppRoute, AuthorizationStatus} from "../../constants";

const UserBlock = ({authorizationStatus}) => {
  return (
    <div className="user-block">

      {authorizationStatus === AuthorizationStatus.AUTH ?
        <div className="user-block__avatar">
          <Link to={AppRoute.MY_LIST}>
            <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </Link>
        </div>
        :
        <div className="user-block">
          <Link className="user-block__link" to={AppRoute.LOGIN}>Sign in</Link>
        </div>
      }

    </div>
  );
};

UserBlock.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

export default UserBlock;
