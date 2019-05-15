import { takeLatest, put } from 'redux-saga/effects';
import * as actions from './actions';

function* loginSaga() {
  yield put({ type: 'AZZAZAZ' });
}

export default function* userSaga() {
  yield takeLatest(actions.loginSuccess, loginSaga);
}
