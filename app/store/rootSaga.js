import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import usersSaga from './users/saga';

function* rootSaga() {
  yield all([authSaga(), usersSaga()]);
}

export default rootSaga;
