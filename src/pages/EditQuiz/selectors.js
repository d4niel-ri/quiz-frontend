import { createSelector } from 'reselect';
import { initialState } from '@pages/EditQuiz/reducer';

const selectEditQuizState = (state) => state.editQuiz || initialState;

export const selectQuiz = createSelector(selectEditQuizState, (state) => state.quiz);
export const selectQuestions = createSelector(selectEditQuizState, (state) => state.questions);
