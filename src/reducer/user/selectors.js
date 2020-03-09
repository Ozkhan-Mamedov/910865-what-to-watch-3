import NameSpace from "../name-space";

const NAMESPACE_USER = NameSpace.USER;

const getAuthorizationStatus = (state) => {
  return state[NAMESPACE_USER].authorizationStatus;
};

export {getAuthorizationStatus};
