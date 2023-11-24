/* eslint-disable camelcase */
import { GET_QUIZ, SET_QUIZ } from './constants';

export const setQuiz = (quiz) => ({
  type: SET_QUIZ,
  quiz,
});

export const getQuiz = (token, quiz_id) => ({
  type: GET_QUIZ,
  token,
  quiz_id,
});
