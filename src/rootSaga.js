/* eslint-disable prettier/prettier */
import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import clientSaga from '@containers/Client/saga';
import homeSaga from '@pages/Home/saga';
import settingsSaga from '@pages/Settings/saga';
import activitySaga from '@pages/Activity/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    clientSaga(),
    homeSaga(),
    activitySaga(),
    settingsSaga(),
  ]);
}
