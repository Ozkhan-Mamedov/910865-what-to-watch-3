import ReactDOM from "react-dom";
import React from "react";
import App from "./components/app";

const promoFilmData = {
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: `2014`,
};

ReactDOM.render(<App promoFilmData={promoFilmData} />, document.getElementById(`root`));
