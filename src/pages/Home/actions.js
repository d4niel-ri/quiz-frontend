import { GET_QUIZZES, SET_QUIZZES } from './constants';

export const setQuizzes = (quizzes) => ({
  type: SET_QUIZZES,
  quizzes,
});

export const getQuizzes = (token) => ({
  type: GET_QUIZZES,
  token,
});
