import { setLoading } from '@containers/App/actions';
import { takeLatest, call, put } from 'redux-saga/effects';

import { getMyUserData, login, register, testValidateToken } from '@domain/api';
import { LOGIN, REGISTER, VERIFY_TOKEN } from './constants';
import { setLogin, setToken, setUser } from './actions';

function* doLogin({ inputs, navigate, handleLoginInvalid }) {
  yield put(setLoading(true));
  try {
    const response = yield call(login, inputs);
    yield put(setLogin(true));
    yield put(setToken(response.token));
    const responseUserData = yield call(getMyUserData, response.token);
    yield put(setUser(responseUserData.data));
    yield call(navigate, '/');
  } catch (error) {
    yield call(handleLoginInvalid);
  }
  yield put(setLoading(false));
}

function* doRegister({ inputs, navigate, handleRegisterError }) {
  yield put(setLoading(true));
  try {
    yield call(register, inputs);
    yield call(navigate, '/');
  } catch (error) {
    yield call(handleRegisterError, error.response.data.message);
  }
  yield put(setLoading(false));
}

function* doVerifyToken({ token, navigate }) {
  yield put(setLoading(true));
  try {
    yield call(testValidateToken, token);
  } catch (error) {
    yield put(setLogin(false));
    yield put(setToken(null));
    yield put(setUser(null));
    yield call(navigate, '/login');
  }
  yield put(setLoading(false));
}

export default function* clientSaga() {
  yield takeLatest(LOGIN, doLogin);
  yield takeLatest(REGISTER, doRegister);
  yield takeLatest(VERIFY_TOKEN, doVerifyToken);
}
