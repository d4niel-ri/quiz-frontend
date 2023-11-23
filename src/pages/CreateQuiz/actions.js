import { CREATE_QUIZ } from './constants';

export const createQuiz = (token, inputs, navigate) => ({
  type: CREATE_QUIZ,
  token,
  inputs,
  navigate,
});
