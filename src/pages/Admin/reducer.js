import { produce } from 'immer';
import { OMIT_USER, SET_USERS } from '@pages/Admin/constants';

export const initialState = {
  users: [],
};

export const storedKey = [];

const adminReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_USERS:
        draft.users = action.users;
        break;

      case OMIT_USER:
        draft.users = draft.users.filter((user) => user.id !== action.user_id);
        break;
    }
  });

export default adminReducer;
