import React from "react";
import renderer from "react-test-renderer";

import Footer from "./footer";


it(`Main Footer component renders correctly`, () => {
  const tree = renderer
    .create(
        <Footer />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Footer component renders correctly`, () => {
  const tree = renderer
    .create(
        <Footer isMainPageElement={true}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
