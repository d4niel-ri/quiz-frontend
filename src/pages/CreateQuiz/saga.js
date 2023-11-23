import { setLoading } from '@containers/App/actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import { createQuiz } from '@domain/api';
import { CREATE_QUIZ } from './constants';

function* doCreateQuiz({ token, inputs, navigate }) {
  yield put(setLoading(true));
  try {
    const response = yield call(createQuiz, token, inputs);
    yield call(navigate, `/edit-quiz/${response.data.id}`);
  } catch (error) {
    // error
  }
  yield put(setLoading(false));
}

export default function* createQuizSaga() {
  yield takeLatest(CREATE_QUIZ, doCreateQuiz);
}
