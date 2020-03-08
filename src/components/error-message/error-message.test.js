import React from "react";
import renderer from "react-test-renderer";

import ErrorMessage from "./error-message";

it(`ErrorMessage component renders correctly`, () => {
  const tree = renderer
    .create(<ErrorMessage errorMessage={`message`}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
