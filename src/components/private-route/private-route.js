import React from "react";
import PropTypes from "prop-types";
import {Redirect, Route} from "react-router-dom";

import {AppRoute, AuthorizationStatus} from "../../constants";

const PrivateRoute = (privateRouteProps) => {
  const {render, path, exact, authorizationStatus} = privateRouteProps;

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        return authorizationStatus === AuthorizationStatus.AUTH
          ? render(props)
          : <Redirect to={AppRoute.LOGIN} />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  render: PropTypes.func,
  path: PropTypes.string,
  exact: PropTypes.bool,
  authorizationStatus: PropTypes.string,
};

export {PrivateRoute};
export default PrivateRoute;
