import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectActivityState = (state) => state.activity || initialState;

export const selectQuizzes = createSelector(selectActivityState, (state) => state.quizzes);
