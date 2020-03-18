import extend from "../../utils";
import initialState from "./initial-state";
import {ActionType, ActionCreator} from "./action-creator";
import {AUTHORIZATION_STATUS} from "../../constants";

const Operation = {
  checkUserStatus: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.changeAuthorizationStatus(AUTHORIZATION_STATUS.AUTH));
      });
  },

  login: (authData, onError) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then(() => {
        dispatch(ActionCreator.changeAuthorizationStatus(AUTHORIZATION_STATUS.AUTH));
      })
      .catch(() => onError());
  }
};

const reducer = (state = initialState, action) => {
  if (action.type === ActionType.CHANGE_AUTHORIZATION_STATUS) {
    return extend(state, {
      authorizationStatus: action.payload,
    });
  }

  return state;
};

export {reducer, Operation};
