/* eslint-disable camelcase */
import { DELETE_USER, GET_USERS, OMIT_USER, SET_USERS } from '@pages/Admin/constants';

export const setUsers = (users) => ({
  type: SET_USERS,
  users,
});

export const getUsers = (token) => ({
  type: GET_USERS,
  token,
});

export const deleteUser = (token, user_id, confirmPassword, handleClose, setError) => ({
  type: DELETE_USER,
  token,
  user_id,
  confirmPassword,
  handleClose,
  setError,
});

export const omitUser = (user_id) => ({
  type: OMIT_USER,
  user_id,
});
