import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Redirect, Route} from "react-router-dom";

import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {APP_ROUTES, AUTHORIZATION_STATUS} from "../../constants";

const PrivateRoute = (privateRouteProps) => {
  const {render, path, exact, authorizationStatus} = privateRouteProps;

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        return authorizationStatus === AUTHORIZATION_STATUS.AUTH
          ? render(props)
          : <Redirect to={APP_ROUTES.LOGIN} />;
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});

PrivateRoute.propTypes = {
  render: PropTypes.func,
  path: PropTypes.string,
  exact: PropTypes.bool,
  authorizationStatus: PropTypes.string,
};

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
