import ReactDOM from "react-dom";
import React from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";

import App from "./components/app/app";

import promoFilmData from "./mocks/promo";
import films from "./mocks/films";
import filmsComments from "./mocks/comments";
import {reducer} from "./reducer/reducer";

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
      <App promoFilmData={promoFilmData} films={films} filmsComments={filmsComments} />
    </Provider>,
    document.getElementById(`root`));
