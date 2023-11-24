/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: '',
  user: '/api/user',
  quiz: '/api/quiz',
  question: '/api/question',
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
export const testValidateToken = (token) => callAPI(
  `${urls.user}/verify-token`, 'POST', { authorization: `Bearer ${token}` }
);
export const login = (inputs) => callAPI(`${urls.user}/login`, 'POST', {}, {}, inputs);
export const getMyUserData = (token) => callAPI(
  `${urls.user}/my-data`, 'GET', { authorization: `Bearer ${token}` }
);
export const register = (inputs) => callAPI(`${urls.user}/register`, 'POST', {}, {}, inputs);
export const getUsers = (token) => callAPI(urls.user, 'GET', { authorization: `Bearer ${token}` });
export const deleteUser = (token, user_id, confirmationPassword) => callAPI(
  `${urls.user}/delete-user/${user_id}`, 'DELETE', { authorization: `Bearer ${token}`}, {}, 
  {confirmationPassword}
);
export const getAvailableQuizzes = (token) => callAPI(
  `${urls.quiz}`, 'GET', { authorization: `Bearer ${token}` }
);
export const getCompletedQuizzes = (token) => callAPI(
  `${urls.quiz}/my-completed-quizzes`, "GET", { authorization: `Bearer ${token}` }
);
export const getCreatedQuizzes = (token) => callAPI(
  `${urls.quiz}/my-created-quizzes`, "GET", { authorization: `Bearer ${token}` }
);
export const changeProfile = (token, inputs) => callAPI(
  urls.user, 'PUT', { authorization: `Bearer ${token}` }, {}, inputs
);
export const createQuiz = (token, inputs) => callAPI(
  urls.quiz, 'POST', { authorization: `Bearer ${token}` }, {}, inputs
);
export const getQuiz = (token, quiz_id) => callAPI(
  urls.quiz, 'GET', { authorization: `Bearer ${token}` }, {id: quiz_id}
);
export const getQuestions = (token, quiz_id) => callAPI(
  `${urls.question}/${quiz_id}`, 'GET', { authorization: `Bearer ${token}` }
);
export const updateQuiz = (token, quiz_id, inputs) => callAPI(
  `${urls.quiz}/${quiz_id}`, 'PUT', { authorization: `Bearer ${token}` }, {}, inputs
);
export const deleteQuestion = (token, question_id) => callAPI(
  `${urls.question}/${question_id}`, 'DELETE', { authorization: `Bearer ${token}` }
)