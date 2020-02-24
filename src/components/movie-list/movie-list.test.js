import React from "react";
import renderer from "react-test-renderer";

import MovieList from "./movie-list";

const films = [
  {
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
    preview: `preview#3`,
  },
  {
    name: `Film#2`,
    picture: `picture#2`,
    genre: `genre#2`,
    id: 2,
    releaseDate: `2025`,
    ratingScore: 2,
    ratingsNumber: 5,
    director: `Director#2`,
    starring: [`Actor#1`, `Actor#2`, `Actor#3`],
    description: [`Test paragraph #1.`, `Test paragraph #2.`],
    preview: `preview#2`,
  },
  {
    name: `Film#3`,
    picture: `picture#3`,
    genre: `genre#3`,
    id: 3,
    releaseDate: `1990`,
    ratingScore: 5,
    ratingsNumber: 211,
    director: `Director#3`,
    starring: [`Actor#1`, `Actor#2`],
    description: [`Test paragraph #1.`],
    preview: `preview#3`,
  },
];

it(`MovieList component renders correctly`, () => {
  const tree = renderer
    .create(<MovieList films={films} filmNameClickHandler={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
