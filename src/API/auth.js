import axios from 'axios';

/**
 * 呼叫`登入`API
 * @param string username
 * @param string password
 * @return {Promise<AxiosResponse<T> | never>}
 */
export const callPostLogin = (username, password) => {
  const url = '/auth_api/user/login';
  const params = {
    username,
    password,
  };

  return axios.post(url, params)
    .then((response) => (response.data));
};

export default callPostLogin;
