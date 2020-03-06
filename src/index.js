import ReactDOM from "react-dom";
import React from "react";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

import App from "./components/app/app";

import {Operation, reducer} from "./reducer/reducer";
import createAPI from "./api";

const api = createAPI(() => {});
const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(Operation.getFilmList())
  .then(() => store.dispatch(Operation.getPromoMovieData())
  .then(() => {
    ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById(`root`));
  }));
