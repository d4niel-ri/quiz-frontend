import { setLoading } from '@containers/App/actions';
import { takeLatest, call, put } from 'redux-saga/effects';

import { getMyUserData, login } from '@domain/api';
import { LOGIN } from './constants';
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
    console.error(error);
    yield call(handleLoginInvalid);
  }
  yield put(setLoading(false));
}

export default function* clientSaga() {
  yield takeLatest(LOGIN, doLogin);
}
