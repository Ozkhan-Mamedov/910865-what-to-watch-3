import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

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
    .create(<Main promoFilmData={promoFilmData} films={films} filmNameClickHandler={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
