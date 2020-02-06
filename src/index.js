import ReactDOM from "react-dom";
import React from "react";
import App from "./components/app/app";
import promoFilmData from "./mock/promo";

ReactDOM.render(<App promoFilmData={promoFilmData} />, document.getElementById(`root`));
