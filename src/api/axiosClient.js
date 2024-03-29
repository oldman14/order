import axios from 'axios';
import queryString from 'query-string';
import {RN_APP_API_URL} from '@env';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config`

const axiosClient = axios.create({
  baseURL: 'http://192.168.171.2:3000',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async config => {
  // Handle token here ...
  return config;
});
axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    // Handle errors
    throw error;
  },
);
export default axiosClient;
