import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";

import SignIn from "./sign-in";

import reducer from "../../reducer/reducer";

it(`SignIn component renders correctly for main page`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(reducer)}>
          <SignIn />
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
