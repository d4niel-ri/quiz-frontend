/* eslint-disable prettier/prettier */
import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: '',
  user: '/api/user',
  quiz: '/api/quiz',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');
export const login = (inputs) => callAPI(`${urls.user}/login`, 'POST', {}, {}, inputs);
export const getMyUserData = (token) => callAPI(
  `${urls.user}/my-data`, 'GET', { authorization: `Bearer ${token}` }
);
