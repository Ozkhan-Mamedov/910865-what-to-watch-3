import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";

import UserBlock from "./user-block";

import reducer from "../../reducer/reducer";

it(`UserBlock component renders correctly for main page`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(reducer)}>
          <UserBlock loginButtonClickHandler={() => {}}/>
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
