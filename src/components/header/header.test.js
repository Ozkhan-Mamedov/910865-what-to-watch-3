import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import Header from "./header";

import history from "../../history";

it(`Main Header component renders correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Header />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Header component renders correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Header isMainPageElement={false}/>
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
