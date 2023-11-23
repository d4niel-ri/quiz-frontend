import { GET_COMPLETED_QUIZZES, GET_CREATED_QUIZZES, SET_QUIZZES } from './constants';

export const setQuizzes = (quizzes) => ({
  type: SET_QUIZZES,
  quizzes,
});

export const getCompletedQuizzes = (token) => ({
  type: GET_COMPLETED_QUIZZES,
  token,
});

export const getCreatedQuizzes = (token) => ({
  type: GET_CREATED_QUIZZES,
  token,
});
