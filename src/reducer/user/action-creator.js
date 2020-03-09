import {CHANGE_AUTHORIZATION_STATUS} from "../../constants";

const ActionType = {
  CHANGE_AUTHORIZATION_STATUS
};

const ActionCreator = {
  changeAuthorizationStatus: (status) => ({
    type: ActionType.CHANGE_AUTHORIZATION_STATUS,
    payload: status,
  })
};

export {ActionCreator, ActionType};
