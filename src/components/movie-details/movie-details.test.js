import React from "react";
import renderer from "react-test-renderer";

import MovieDetails from "./movie-details";

const film = {
  name: `Film#1`,
  picture: `picture#1`,
  genre: `genre#1`,
  id: 1,
  releaseDate: `2020`,
  ratingScore: 1,
  ratingsNumber: 2,
  director: `Director#1`,
  starring: [`Actor#1`, `Actor#2`, `Actor#3`, `Actor#4`],
  description: [`Test paragraph #1.`, `Test paragraph #2.`],
};

it(`MovieDetails component renders correctly`, () => {
  const tree = renderer
    .create(<MovieDetails film={film} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
