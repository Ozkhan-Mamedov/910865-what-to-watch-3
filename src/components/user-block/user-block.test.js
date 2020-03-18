import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {Router} from "react-router-dom";

import UserBlock from "./user-block";

import reducer from "../../reducer/reducer";
import history from "../../history";
import {AUTHORIZATION_STATUS} from "../../constants";

it(`UserBlock component renders correctly for main page`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(reducer)}>
          <Router history={history}>
            <UserBlock loginButtonClickHandler={() => {}} authorizationStatus={AUTHORIZATION_STATUS.AUTH}/>
          </Router>
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
