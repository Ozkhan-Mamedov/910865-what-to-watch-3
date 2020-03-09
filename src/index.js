import ReactDOM from "react-dom";
import React from "react";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

import App from "./components/app/app";
import ErrorMessage from "./components/error-message/error-message";

import {ActionCreator as AppActionCreator} from "./reducer/app/action-creator";
import {Operation as userOperation} from "./reducer/user/reducer";
import {Operation as dataOperation} from "./reducer/data/reducer";
import reducer from "./reducer/reducer";
import createAPI from "./api";
import {AUTHORIZATION_STATUS, SERVER_NOT_WORKING_ERROR} from "./constants";
import {ActionCreator} from "./reducer/user/action-creator";

const errorHandler = () => {
  store.dispatch(AppActionCreator.changeServerStatus(false));
  ReactDOM.render(
      <ErrorMessage errorMessage={SERVER_NOT_WORKING_ERROR} />,
      document.getElementById(`root`));
};

const onUnauthorized = () => {
  store.dispatch(ActionCreator.changeAuthorizationStatus(AUTHORIZATION_STATUS.NO_AUTH));
};

const api = createAPI(errorHandler, onUnauthorized);
const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(dataOperation.getFilmList())
  .then(() => {
    store.dispatch(dataOperation.getPromoMovieData());
  })
  .then(() => {
    store.dispatch(userOperation.checkUserStatus());
  })
  .then(() => {
    ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById(`root`));
  });
