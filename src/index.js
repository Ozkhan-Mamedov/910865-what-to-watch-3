import ReactDOM from "react-dom";
import React from "react";

import App from "./components/app/app";

import promoFilmData from "./mocks/promo";
import films from "./mocks/films";

ReactDOM.render(<App promoFilmData={promoFilmData} films={films} />, document.getElementById(`root`));
