/* eslint-disable camelcase */
import { setLoading, showPopup } from '@containers/App/actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getQuestion, updateQuestion } from '@domain/api';
import { GET_QUESTION, UPDATE_QUESTION } from './constants';
import { setQuestion } from './actions';

function* doGetQuestion({ token, question_id, setHasMounted }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getQuestion, token, question_id);
    yield put(setQuestion(response.data));
    yield call(setHasMounted, true);
  } catch (error) {
    // error
  }
  yield put(setLoading(false));
}

function* doUpdateQuestion({ token, question_id, inputs, navigate }) {
  yield put(setLoading(true));
  try {
    yield call(updateQuestion, token, question_id, inputs);
    yield call(navigate, -1);
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

export default function* editQuestionSaga() {
  yield takeLatest(GET_QUESTION, doGetQuestion);
  yield takeLatest(UPDATE_QUESTION, doUpdateQuestion);
}
