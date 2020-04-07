import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {Router} from "react-router-dom";

import SignInPage from "./sign-in-page";

import reducer from "../../reducer/reducer";
import history from "../../history";

it(`SignInPage renders correctly for main page`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(reducer)}>
          <Router history={history}>
            <SignInPage errorMessage={`Error!`} onFormSubmit={() => {}}/>
          </Router>
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
