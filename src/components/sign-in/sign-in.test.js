import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {Router} from "react-router-dom";

import SignIn from "./sign-in";

import reducer from "../../reducer/reducer";
import history from "../../history";

it(`SignIn component renders correctly for main page`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(reducer)}>
          <Router history={history}>
            <SignIn errorMessage={`Error!`} formSubmitHandler={() => {}}/>
          </Router>
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
