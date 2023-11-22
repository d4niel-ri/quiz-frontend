import { setLoading } from '@containers/App/actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import { changeProfile } from '@domain/api';
import { setUser } from '@containers/Client/actions';
import { CHANGE_EMAIL, CHANGE_IMAGE, CHANGE_USERNAME } from './constants';

function* doChangeUsername({ token, username, handleClose, setError }) {
  yield put(setLoading(true));
  try {
    const inputs = {};
    inputs.username = username;
    const response = yield call(changeProfile, token, inputs);
    yield put(setUser(response.data));
    yield call(handleClose);
  } catch (error) {
    // error
    yield call(setError, error.response.data.message);
  }
  yield put(setLoading(false));
}

function* doChangeEmail({ token, email, handleClose, setError }) {
  yield put(setLoading(true));
  try {
    const inputs = {};
    inputs.email = email;
    const response = yield call(changeProfile, token, inputs);
    yield put(setUser(response.data));
    yield call(handleClose);
  } catch (error) {
    // error
    yield call(setError, error.response.data.message);
  }
  yield put(setLoading(false));
}

function* doChangeImage({ token, formData, handleClose }) {
  yield put(setLoading(true));
  try {
    const response = yield call(changeProfile, token, formData);
    yield put(setUser(response.data));
    yield call(handleClose);
  } catch (error) {
    // error
  }
  yield put(setLoading(false));
}

export default function* settingsSaga() {
  yield takeLatest(CHANGE_USERNAME, doChangeUsername);
  yield takeLatest(CHANGE_EMAIL, doChangeEmail);
  yield takeLatest(CHANGE_IMAGE, doChangeImage);
}
