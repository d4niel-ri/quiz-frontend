/* eslint-disable camelcase */
import { DELETE_QUESTION, GET_QUIZ, SET_QUESTIONS, SET_QUIZ, UPDATE_QUIZ } from '@pages/EditQuiz/constants';

export const setQuiz = (quiz) => ({
  type: SET_QUIZ,
  quiz,
});

export const getQuiz = (user, token, quiz_id, setAllow, navigate) => ({
  type: GET_QUIZ,
  user,
  token,
  quiz_id,
  setAllow,
  navigate,
});

export const updateQuiz = (token, quiz_id, handleClose, inputs) => ({
  type: UPDATE_QUIZ,
  token,
  quiz_id,
  handleClose,
  inputs,
});

export const setQuestions = (questions) => ({
  type: SET_QUESTIONS,
  questions,
});

export const deleteQuestion = (token, question_id) => ({
  type: DELETE_QUESTION,
  token,
  question_id,
});
