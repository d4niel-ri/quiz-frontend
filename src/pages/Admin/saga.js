/* eslint-disable camelcase */
import { setLoading } from '@containers/App/actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import { deleteUser, getUsers } from '@domain/api';
import { DELETE_USER, GET_USERS } from '@pages/Admin/constants';
import { omitUser, setUsers } from '@pages/Admin/actions';

function* doGetUsers({ token }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getUsers, token);
    yield put(setUsers(response.data));
  } catch (error) {
    // error
  }
  yield put(setLoading(false));
}

function* doDeleteUser({ token, user_id, confirmPassword, handleClose, setError }) {
  yield put(setLoading(true));
  try {
    yield call(deleteUser, token, user_id, confirmPassword);
    yield put(omitUser(user_id));
    yield call(handleClose);
  } catch (error) {
    yield call(setError, error.response.data.message);
  }
  yield put(setLoading(false));
}

export default function* adminSaga() {
  yield takeLatest(GET_USERS, doGetUsers);
  yield takeLatest(DELETE_USER, doDeleteUser);
}
