import { takeLatest, put } from 'redux-saga/effects';
import qs from 'querystring';
import moment from 'moment';
import ApiService from '../../services/api';
import * as actions from './actions';

const toQuery = (arr) => {
  const obj = arr.reduce((init, item) => {
    switch (item.id) {
      case 'created_at': {
        if (item.value.from) init.created_at__from = item.value.from.toISOString();
        if (item.value.to) {
          init.created_at__to = moment(item.value.to)
            .add(59, 's')
            .toISOString();
        }
        break;
      }
      case 'type': {
        init.transaction_type__equals_agg = item.value;
        break;
      }
      case 'user': {
        const fieldName = `$${item.id[0].toUpperCase()}${item.id.slice(1)}.names$__contains`;
        if (item.value) init[fieldName] = item.value;
        break;
      }
      case 'amount_after_transaction':
      case 'total_price': {
        if (item.value.from) init[`${item.id}__from_agg`] = item.value.from;
        if (item.value.to) init[`${item.id}__to_agg`] = item.value.to;
        break;
      }
      case 'id': {
        if (item.value) init.transaction_id__equals_agg = item.value;
        break;
      }
      default: {
        init[`${item.id}__contains`] = item.value;
      }
    }
    return init;
  }, {});
  return qs.stringify(obj);
};

const apiRoutes = {
  openPaydesk: '/paydesk/open',
  closePaydesk: '/paydesk/close',
  checkPaydesk: '/paydesk/amount',
  addCash: '/cash/add',
  withdrawCash: '/cash/withdraw',
  fetchPaydeskOperations: (offset, limit, orderField, orderDirection, filtered) => {
    const order = orderField ? `&orderBy=${orderField}&order=${orderDirection}` : '';
    const filters = filtered.length ? `&${toQuery(filtered)}` : '';
    return `/paydesk/?offset=${offset}&limit=${limit}${order}${filters}`;
  },
};

function* fetchPaydeskOperationsSaga({ payload: { offset, limit, sorted, filtered } }) {
  try {
    const orderDirection = sorted.desc ? 'desc' : 'asc';
    const response = yield ApiService.instance.get(
      apiRoutes.fetchPaydeskOperations(offset, limit, sorted.id, orderDirection, filtered)
    );
    if (response.status === 200) {
      yield put(actions.fetchPaydeskOperationsSuccess(response.data.transactions, response.data.totalCount));
    } else {
      throw new Error('Error during fetching paydesk operations');
    }
  } catch (e) {
    console.log('e', e || e.response || e.message);
    yield put(actions.fetchPaydeskOperationsFailure());
  }
}

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
  yield takeLatest(actions.fetchPaydeskOperations, fetchPaydeskOperationsSaga);
}
