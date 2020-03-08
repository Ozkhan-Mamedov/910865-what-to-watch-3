import axios from "axios";

import {ERROR} from "./constants";

const createAPI = (errorHandler) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (responce) => {
    return responce;
  };

  const onError = (error) => {
    const {response} = error;

    if (response.status === ERROR.UNAUTHORIZED) {
      throw error;
    }

    if (response.status === ERROR.NOT_FOUND || response.status.toString[0] === ERROR.SERVER_ERROR[0]) {
      errorHandler();
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};

export default createAPI;
