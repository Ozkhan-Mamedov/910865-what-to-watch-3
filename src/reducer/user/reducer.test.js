import {reducer} from "./reducer";
import {ActionCreator} from "./action-creator";
import initialState from "./initial-state";
import {AUTHORIZATION_STATUS} from "../../constants";

describe(`Reducer works correctly`, () => {
  it(`Reducer without parameters returns initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should change films list correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeAuthorizationStatus(AUTHORIZATION_STATUS.AUTH))).toEqual({
      authorizationStatus: AUTHORIZATION_STATUS.AUTH
    });
  });

  it(`Reducer should change filmsComments list correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeAuthorizationStatus(AUTHORIZATION_STATUS.NO_AUTH))).toEqual({
      authorizationStatus: AUTHORIZATION_STATUS.NO_AUTH
    });
  });

  it(`Reducer should change promo film data correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeAuthorizationStatus(AUTHORIZATION_STATUS.REQUIRED))).toEqual({
      authorizationStatus: AUTHORIZATION_STATUS.REQUIRED
    });
  });
});
