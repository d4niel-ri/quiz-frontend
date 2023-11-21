/* eslint-disable prettier/prettier */
import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import clientSaga from '@containers/Client/saga';
import homeSaga from '@pages/Home/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    clientSaga(),
    homeSaga(),
  ]);
}
