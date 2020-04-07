import {reducer} from "./reducer";
import {ActionCreator} from "./action-creator";
import initialState from "./initial-state";
import {AuthorizationStatus} from "../../constants";

describe(`Reducer works correctly`, () => {
  it(`Reducer without parameters returns initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should change films list correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeAuthorizationStatus(AuthorizationStatus.AUTH))).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH
    });
  });

  it(`Reducer should change filmsComments list correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeAuthorizationStatus(AuthorizationStatus.NO_AUTH))).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH
    });
  });
});
