import axios from "axios";

const createAPI = () => {
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

    if (response.status === 401) {
      throw error;
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};

export default createAPI;
