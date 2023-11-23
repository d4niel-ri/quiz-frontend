/* eslint-disable camelcase */
import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { deleteQuestion, getQuestions, getQuiz, updateQuiz } from '@domain/api';
import { DELETE_QUESTION, GET_QUIZ, UPDATE_QUIZ } from '@pages/EditQuiz/constants';
import { setQuestions, setQuiz } from '@pages/EditQuiz/actions';

function* doGetQuiz({ user, token, quiz_id, setAllow, navigate }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getQuiz, token, quiz_id);
    if (response.data.author_id !== user.id) {
      yield call(navigate, '/');
    } else {
      yield call(setAllow, true);
      yield put(setQuiz(response.data));

      const questionResponse = yield call(getQuestions, token, quiz_id);
      yield put(setQuestions(questionResponse.data));
    }
  } catch (error) {
    // error
    yield call(navigate, '/');
  }
  yield put(setLoading(false));
}

function* doUpdateQuiz({ token, quiz_id, handleClose, inputs }) {
  yield put(setLoading(true));
  try {
    const response = yield call(updateQuiz, token, quiz_id, inputs);
    yield put(setQuiz(response.data));
    yield call(handleClose);
  } catch (error) {
    // error
  }
  yield put(setLoading(false));
}

function* doDeleteQuestion({ token, question_id }) {
  yield put(setLoading(true));
  try {
    const response = yield call(deleteQuestion, token, question_id);
    yield put(setQuestions(response.data));
  } catch (error) {
    // error
  }
  yield put(setLoading(false));
}

export default function* editQuizSaga() {
  yield takeLatest(GET_QUIZ, doGetQuiz);
  yield takeLatest(UPDATE_QUIZ, doUpdateQuiz);
  yield takeLatest(DELETE_QUESTION, doDeleteQuestion);
}
