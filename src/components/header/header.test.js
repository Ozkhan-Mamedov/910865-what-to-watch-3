import React from "react";
import renderer from "react-test-renderer";

import Header from "./header";

it(`Main Header component renders correctly`, () => {
  const tree = renderer
    .create(
        <Header />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Header component renders correctly`, () => {
  const tree = renderer
    .create(
        <Header isActive={true}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
