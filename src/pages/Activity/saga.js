import { setLoading } from '@containers/App/actions';
import { getCompletedQuizzes, getCreatedQuizzes } from '@domain/api';
import { takeLatest, call, put } from 'redux-saga/effects';
import { setQuizzes } from './actions';
import { GET_COMPLETED_QUIZZES, GET_CREATED_QUIZZES } from './constants';

function* doGetCompletedQuizzes({ token }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getCompletedQuizzes, token);
    yield put(setQuizzes(response.data));
  } catch (error) {
    // error
  }
  yield put(setLoading(false));
}

function* doGetCreatedQuizzes({ token }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getCreatedQuizzes, token);
    yield put(setQuizzes(response.data));
  } catch (error) {
    // error
  }
  yield put(setLoading(false));
}

export default function* activitySaga() {
  yield takeLatest(GET_COMPLETED_QUIZZES, doGetCompletedQuizzes);
  yield takeLatest(GET_CREATED_QUIZZES, doGetCreatedQuizzes);
}
