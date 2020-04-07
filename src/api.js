import axios from "axios";

import {Error} from "./constants";

const createAPI = (handleServerError, handleUnauthorizedStatus) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const handleSuccessfulRequest = (responce) => {
    return responce;
  };

  const handleErrorRequest = (error) => {
    const {response} = error;

    if (response.status === Error.UNAUTHORIZED) {
      handleUnauthorizedStatus();

      throw error;
    }

    if (response.status === Error.NOT_FOUND || response.status.toString[0] === Error.SERVER_ERROR[0]) {
      handleServerError();
    }

    throw error;
  };

  api.interceptors.response.use(handleSuccessfulRequest, handleErrorRequest);

  return api;
};

export default createAPI;
