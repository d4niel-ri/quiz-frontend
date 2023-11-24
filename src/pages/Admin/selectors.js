import { initialState } from '@pages/Admin/reducer';
import { createSelector } from 'reselect';

const selectAdminState = (state) => state.admin || initialState;

export const selectUsers = createSelector(selectAdminState, (state) => state.users);
