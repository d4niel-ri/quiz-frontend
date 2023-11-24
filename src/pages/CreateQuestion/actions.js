/* eslint-disable camelcase */
import { CREATE_QUESTION } from '@pages/CreateQuestion/constants';

export const createQuestion = (token, quiz_id, inputs, navigate) => ({
  type: CREATE_QUESTION,
  token,
  quiz_id,
  inputs,
  navigate,
});
