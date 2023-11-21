import { LOGIN, REGISTER, SET_LOGIN, SET_TOKEN, SET_USER, VERIFY_TOKEN } from '@containers/Client/constants';

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

export const register = (inputs, navigate, handleRegisterError) => ({
  type: REGISTER,
  inputs,
  navigate,
  handleRegisterError,
});

export const verifyToken = (token, navigate) => ({
  type: VERIFY_TOKEN,
  token,
  navigate,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});
