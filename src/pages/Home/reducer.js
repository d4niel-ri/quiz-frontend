import { produce } from 'immer';
import { SET_QUIZZES } from './constants';

export const initialState = {
  quizzes: [],
};

export const storedKey = [];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_QUIZZES:
        draft.quizzes = action.quizzes;
        break;
    }
  });

export default homeReducer;
