import ReactDOM from "react-dom";
import React from "react";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

import App from "./components/app/app";
import ErrorPage from "./components/error-page/error-page";

import {ActionCreator as AppActionCreator} from "./reducer/app/action-creator";
import {Operation as UserOperation} from "./reducer/user/reducer";
import {Operation as DataOperation} from "./reducer/data/reducer";
import reducer from "./reducer/reducer";
import createAPI from "./api";
import {AuthorizationStatus, SERVER_NOT_WORKING_ERROR} from "./constants";
import {ActionCreator as UserActionCreator} from "./reducer/user/action-creator";

const handleServerError = () => {
  store.dispatch(AppActionCreator.changeServerStatus(false));
  ReactDOM.render(
      <ErrorPage errorMessage={SERVER_NOT_WORKING_ERROR} />,
      document.getElementById(`root`));
};

const handleUnauthorizedStatus = () => {
  store.dispatch(UserActionCreator.changeAuthorizationStatus(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(handleServerError, handleUnauthorizedStatus);
const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(UserOperation.checkUserStatus());
store.dispatch(DataOperation.getFavoriteFilms());
store.dispatch(DataOperation.getFilmList())
  .then(() => store.dispatch(DataOperation.getPromoMovieData()))
  .then(() => setTimeout(ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById(`root`)), 1000));
