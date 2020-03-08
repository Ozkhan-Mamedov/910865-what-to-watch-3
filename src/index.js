import ReactDOM from "react-dom";
import React from "react";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

import App from "./components/app/app";
import ErrorMessage from "./components/error-message/error-message";


import {ActionCreator as AppActionCreator} from "./reducer/app/action-creator";
import {Operation} from "./reducer/data/reducer";
import reducer from "./reducer/reducer";
import createAPI from "./api";
import {SERVER_NOT_WORKING_ERROR} from "./constants";

const errorHandler = () => {
  store.dispatch(AppActionCreator.changeServerStatus(false));
  ReactDOM.render(
      <ErrorMessage errorMessage={SERVER_NOT_WORKING_ERROR} />,
      document.getElementById(`root`));
};

const api = createAPI(errorHandler);
const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(Operation.getFilmList())
  .then(() => {
    store.dispatch(Operation.getPromoMovieData());
  })
  .then(() => {
    ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById(`root`));
  });
