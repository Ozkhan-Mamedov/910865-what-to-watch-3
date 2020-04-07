import React from "react";
import renderer from "react-test-renderer";

import ErrorPage from "./error-page";

it(`ErrorPage renders correctly`, () => {
  const tree = renderer
    .create(<ErrorPage errorMessage={`message`}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
