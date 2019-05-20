import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import usersSaga from './users/saga';
import materialsSaga from './materials/saga';

function* rootSaga() {
  yield all([authSaga(), usersSaga(), materialsSaga()]);
}

export default rootSaga;
