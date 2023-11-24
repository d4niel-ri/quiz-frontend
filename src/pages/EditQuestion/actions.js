/* eslint-disable camelcase */
import { GET_QUESTION, SET_QUESTION, UPDATE_QUESTION } from '@pages/EditQuestion/constants';

export const setQuestion = (question) => ({
  type: SET_QUESTION,
  question,
});

export const getQuestion = (token, question_id, setHasMounted) => ({
  type: GET_QUESTION,
  token,
  question_id,
  setHasMounted,
});

export const updateQuestion = (token, question_id, inputs, navigate) => ({
  type: UPDATE_QUESTION,
  token,
  question_id,
  inputs,
  navigate,
});
