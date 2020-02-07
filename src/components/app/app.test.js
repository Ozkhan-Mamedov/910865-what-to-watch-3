import React from "react";
import renderer from "react-test-renderer";
import App from "./app";

const promoFilmData = {
  name: `name`,
  genre: `genre`,
  releaseDate: `date`,
};

const films = [
  `Film#1`,
  `Film#2`,
  `Film#3`,
];

it(`App component renders correctly`, () => {
  const tree = renderer
    .create(<App promoFilmData={promoFilmData} films={films} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
