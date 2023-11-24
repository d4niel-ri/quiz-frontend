import { produce } from 'immer';
import { SET_QUESTION } from '@pages/EditQuestion/constants';

export const initialState = {
  question: null,
};

export const storedKey = [];

const editQuestionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_QUESTION:
        draft.question = action.question;
        break;
    }
  });

export default editQuestionReducer;
