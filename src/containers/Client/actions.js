import { LOGIN, SET_LOGIN, SET_TOKEN, SET_USER } from '@containers/Client/constants';

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const login = (inputs, navigate, handleLoginInvalid) => ({
  type: LOGIN,
  inputs,
  navigate,
  handleLoginInvalid,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});
