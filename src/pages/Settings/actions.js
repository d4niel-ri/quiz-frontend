import { CHANGE_EMAIL, CHANGE_IMAGE, CHANGE_USERNAME } from './constants';

export const changeUsername = (token, username, handleClose, setError) => ({
  type: CHANGE_USERNAME,
  token,
  username,
  handleClose,
  setError,
});

export const changeEmail = (token, email, handleClose, setError) => ({
  type: CHANGE_EMAIL,
  token,
  email,
  handleClose,
  setError,
});

export const changeImage = (token, formData, handleClose) => ({
  type: CHANGE_IMAGE,
  token,
  formData,
  handleClose,
});
