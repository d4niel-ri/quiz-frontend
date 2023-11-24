import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDetailState = (state) => state.detail || initialState;

export const selectQuiz = createSelector(selectDetailState, (state) => state.quiz);
