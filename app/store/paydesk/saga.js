import { takeLatest, put } from 'redux-saga/effects';
import ApiService from '../../services/api';
import * as actions from './actions';

const apiRoutes = {
  openPaydesk: '/paydesk/open',
  closePaydesk: '/paydesk/close',
};

function* openPaydeskSaga({ payload: { amount, cb } }) {
  try {
    const response = yield ApiService.instance.post(apiRoutes.openPaydesk, { amount });
    if (response.status === 201) {
      yield put(actions.openPaydeskSuccess(amount));
      cb();
    } else {
      throw new Error('Error during opening paydesk');
    }
  } catch (e) {
    yield put(actions.openPaydeskFailure());
    cb(e.response.data.error.message || e.message);
  }
}

function* closePaydeskSaga({ payload: { amount, cb } }) {
  try {
    const response = yield ApiService.instance.post(apiRoutes.closePaydesk, { amount });
    if (response.status === 202) {
      yield put(actions.closePaydeskSuccess());
      cb();
    } else {
      throw new Error('Error during closing paydesk');
    }
  } catch (e) {
    yield put(actions.closePaydeskFailure());
    cb(e.response?.data?.error?.message || e.message);
  }
}

export default function* userSaga() {
  yield takeLatest(actions.openPaydesk, openPaydeskSaga);
  yield takeLatest(actions.closePaydesk, closePaydeskSaga);
}
