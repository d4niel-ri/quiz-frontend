import { createSelector } from 'reselect';
import { initialState } from '@pages/EditQuestion/reducer';

const selectEditQuestionState = (state) => state.editQuestion || initialState;

export const selectQuestion = createSelector(selectEditQuestionState, (state) => state.question);
