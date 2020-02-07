import ReactDOM from "react-dom";
import React from "react";

import App from "./components/app/app";

import promoFilmData from "./mock/promo";
import films from "./mock/films";

ReactDOM.render(<App promoFilmData={promoFilmData} films={films} />, document.getElementById(`root`));
