import React from "react";
import renderer from "react-test-renderer";

import ShowMoreButton from "./show-more-button";

it(`ShowMoreButton component renders correctly for main page`, () => {
  const tree = renderer
    .create(<ShowMoreButton onButtonClick={() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
