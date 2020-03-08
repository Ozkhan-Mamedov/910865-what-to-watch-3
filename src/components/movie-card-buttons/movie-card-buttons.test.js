import React from "react";
import renderer from "react-test-renderer";

import {MovieCardButtons} from "./movie-card-buttons";

it(`MovieCardButtons component renders correctly`, () => {
  const tree = renderer
    .create(
        <MovieCardButtons />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MovieCardButtons component renders correctly`, () => {
  const tree = renderer
    .create(
        <MovieCardButtons isMainPageElement={true}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
