import { produce } from 'immer';
import { SET_QUIZ } from './constants';

export const initialState = {
  quiz: null,
};

export const storedKey = [];

const detailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_QUIZ:
        draft.quiz = action.quiz;
        break;
    }
  });

export default detailReducer;
