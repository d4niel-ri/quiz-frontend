import { setLoading } from '@containers/App/actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getAvailableQuizzes } from '@domain/api';
import { GET_QUIZZES } from './constants';
import { setQuizzes } from './actions';

function* doGetQuizzes({ token }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getAvailableQuizzes, token);
    yield put(setQuizzes(response.data));
  } catch (error) {
    console.error(error);
  }
  yield put(setLoading(false));
}

export default function* homeSaga() {
  yield takeLatest(GET_QUIZZES, doGetQuizzes);
}
