/* eslint-disable camelcase */
import { setLoading, showPopup } from '@containers/App/actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import { createQuestion } from '@domain/api';
import { CREATE_QUESTION } from './constants';

function* doCreateQuestion({ token, quiz_id, inputs, navigate }) {
  yield put(setLoading(true));
  try {
    yield call(createQuestion, token, quiz_id, inputs);
    yield call(navigate, -1);
  } catch (error) {
    yield put(showPopup());
  }

  yield put(setLoading(false));
}

export default function* createQuestionSaga() {
  yield takeLatest(CREATE_QUESTION, doCreateQuestion);
}
