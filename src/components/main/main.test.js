import React from "react";
import renderer from "react-test-renderer";

import Main from "./main";

const promoFilmData = {
  name: `name`,
  genre: `genre`,
  releaseDate: `date`,
};

const films = [
  {
    name: `Film#1`,
    picture: `picture#1`,
    genre: `genre#1`,
    id: `#1`,
  },
  {
    name: `Film#2`,
    picture: `picture#2`,
    genre: `genre#2`,
    id: `#2`,
  },
  {
    name: `Film#3`,
    picture: `picture#3`,
    genre: `genre#3`,
    id: `#3`,
  },
];

it(`App component renders correctly`, () => {
  const tree = renderer
    .create(<Main promoFilmData={promoFilmData} films={films} filmNameClickHandler={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
