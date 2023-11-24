import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import homeReducer, { storedKey as storedHomeState } from '@pages/Home/reducer';
import activityReducer, { storedKey as storedActivityState } from '@pages/Activity/reducer';
import editQuizReducer, { storedKey as storedEditQuizState } from '@pages/EditQuiz/reducer';
import adminReducer, { storedKey as storedAdminState } from '@pages/Admin/reducer';
import editQuestionReducer, { storedKey as storedEditQuestionState } from '@pages/EditQuestion/reducer';
import detailReducer, { storedKey as storedDetailState } from '@pages/Detail/reducer';
import languageReducer from '@containers/Language/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  home: { reducer: homeReducer, whitelist: storedHomeState },
  activity: { reducer: activityReducer, whitelist: storedActivityState },
  editQuiz: { reducer: editQuizReducer, whitelist: storedEditQuizState },
  admin: { reducer: adminReducer, whitelist: storedAdminState },
  editQuestion: { reducer: editQuestionReducer, whitelist: storedEditQuestionState },
  detail: { reducer: detailReducer, whitelist: storedDetailState },
};

const temporaryReducers = {
  language: languageReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
