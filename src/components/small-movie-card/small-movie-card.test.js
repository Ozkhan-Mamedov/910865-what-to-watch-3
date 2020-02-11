import React from "react";
import renderer from "react-test-renderer";

import SmallMovieCard from "./small-movie-card";

const film =
  {
    name: `Film#1`,
    picture: `picture#1`,
    genre: `genre#1`,
    id: 1,
  };

it(`App component renders correctly`, () => {
  const tree = renderer
    .create(<SmallMovieCard film={film} cardHoverHandler={() => {}}
      filmNameClickHandler={() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
