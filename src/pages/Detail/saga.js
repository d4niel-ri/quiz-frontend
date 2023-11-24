/* eslint-disable camelcase */
import { setLoading } from '@containers/App/actions';
import { getQuiz } from '@domain/api';
import { takeLatest, call, put } from 'redux-saga/effects';
import { setQuiz } from './actions';
import { GET_QUIZ } from './constants';

function* doGetQuiz({ token, quiz_id }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getQuiz, token, quiz_id);
    yield put(setQuiz(response.data));
  } catch (error) {
    // error
  }
  yield put(setLoading(false));
}

export default function* detailSaga() {
  yield takeLatest(GET_QUIZ, doGetQuiz);
}
