import { takeLatest, put } from 'redux-saga/effects';
import ApiService from '../../services/api';
import * as actions from './actions';

const apiRoutes = {
  openPaydesk: '/paydesk/open',
  closePaydesk: '/paydesk/close',
  checkPaydesk: '/paydesk/amount',
  addCash: '/cash/add',
  withdrawCash: '/cash/withdraw',
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

function* checkPaydeskStateSaga() {
  try {
    const response = yield ApiService.instance.get(apiRoutes.checkPaydesk);
    if (response.status === 200) {
      // eslint-disable-next-line camelcase
      const { is_open, total_amount } = response.data;
      yield put(actions.checkPaydeskStateSuccess(is_open, total_amount));
    } else {
      throw new Error('Error during checking paydesk state');
    }
  } catch (e) {
    yield put(actions.checkPaydeskStateFailure());
  }
}

function* addCashSaga({ payload: { data, cb } }) {
  try {
    const dataToSend = { transaction_price: data.amount, source: data.source, additional_info: data.additional_info };
    const response = yield ApiService.instance.post(apiRoutes.addCash, dataToSend);
    if (response.status === 201) {
      yield put(actions.addCashSuccess(data.amount));
      cb();
    } else {
      throw new Error('Error during adding cash');
    }
  } catch (e) {
    yield put(actions.addCashFailure());
    cb(e.response?.data?.error?.message || e.message);
  }
}

function* withdrawCashSaga({ payload: { data, cb } }) {
  try {
    const dataToSend = { transaction_price: data.amount, source: data.source, additional_info: data.additional_info };
    const response = yield ApiService.instance.post(apiRoutes.withdrawCash, dataToSend);
    if (response.status === 201) {
      yield put(actions.withdrawCashSuccess(data.amount));
      cb();
    } else {
      throw new Error('Error during adding cash');
    }
  } catch (e) {
    yield put(actions.withdrawCashFailure());
    cb(e.response?.data?.error?.message || e.message);
  }
}

export default function* userSaga() {
  yield takeLatest(actions.openPaydesk, openPaydeskSaga);
  yield takeLatest(actions.closePaydesk, closePaydeskSaga);
  yield takeLatest(actions.checkPaydeskState, checkPaydeskStateSaga);
  yield takeLatest(actions.addCash, addCashSaga);
  yield takeLatest(actions.withdrawCash, withdrawCashSaga);
}
