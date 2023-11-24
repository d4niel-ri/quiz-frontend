import { produce } from 'immer';
import { SET_QUESTIONS, SET_QUIZ } from '@pages/EditQuiz/constants';

export const initialState = {
  quiz: null,
  questions: [],
};

export const storedKey = [];

const editQuizReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_QUIZ:
        draft.quiz = action.quiz;
        break;

      case SET_QUESTIONS:
        draft.questions = action.questions;
        break;
    }
  });

export default editQuizReducer;
