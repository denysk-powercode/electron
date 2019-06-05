import { takeLatest, put } from 'redux-saga/effects';
import qs from 'querystring';
import ApiService from '../../services/api';
import * as actions from './actions';

const toQuery = (arr) => {
  const obj = arr.reduce((init, item) => {
    if (item.id === 'total_price') {
      init.total_price__from = Number(item.value.from) || 0;
      if (item.value.to) init.total_price__to = Number(item.value.to);
      return init;
    }
    if (item.id === 'id' && item.value !== '') {
      init.transaction_id__equals_agg = item.value;
      return init;
    }
    init[`${item.id}__contains`] = item.value;
    return init;
  }, {});
  return qs.stringify(obj);
};

const apiRoutes = {
  fetchTransactions: (offset, limit, orderField, orderDirection, filtered) => {
    const order = orderField ? `&orderBy=${orderField}&order=${orderDirection}` : '';
    const filters = filtered.length ? `&${toQuery(filtered)}` : '';
    return `/transaction/?offset=${offset}&limit=${limit}${order}${filters}`;
  },
  createTransaction: '/transaction',
  updateTransaction: (id) => `/transaction/${id}`,
  importCSV: '/transaction/import',
};

function* fetchTransactionsSaga({ payload: { offset, limit, sorted, filtered, cb } }) {
  try {
    const orderDirection = sorted.desc ? 'desc' : 'asc';
    const response = yield ApiService.instance.get(
      apiRoutes.fetchTransactions(offset, limit, sorted.id, orderDirection, filtered)
    );
    if (response.status === 200) {
      yield put(actions.fetchTransactionsSuccess(response.data.transactions, response.data.totalCount));
      if (cb) cb(response.data.transactions);
    } else {
      throw new Error('Error during fetching transactions');
    }
  } catch (e) {
    yield put(actions.fetchTransactionsFailure());
    if (cb) cb([]);
  }
}

function* createTransactionSaga({ payload: { data, cb } }) {
  try {
    const response = yield ApiService.instance.post(apiRoutes.createTransaction, data);
    if (response.status === 201) {
      yield put(actions.createTransactionSuccess(response.data.transactions[0]));
      cb();
    } else {
      throw new Error('Error during transaction creation');
    }
  } catch (e) {
    cb(e.response.data.error || e.message || e);
    yield put(actions.createTransactionFailure());
  }
}

function* updateTransactionSaga({ payload: { data, cb } }) {
  try {
    const { id: transactionId } = data;
    delete data.id;
    const response = yield ApiService.instance.patch(apiRoutes.updateTransaction(transactionId), data);
    if (response.status === 202) {
      yield put(actions.updateTransactionSuccess(response.data.transaction));
      if (cb) cb();
    } else {
      throw new Error('Error during transaction update');
    }
  } catch (e) {
    if (cb) cb(e.response.data.error.message || e.message || e);
    yield put(actions.updateTransactionFailure());
  }
}

function* importCSVSaga({ payload: { file } }) {
  try {
    const formData = new FormData();
    formData.append('csv', file);
    const response = yield ApiService.instance.post(apiRoutes.importCSV, formData);
    if (response.status === 202) {
      yield put(actions.importCSVSuccess());
      yield put(actions.fetchTransactions());
    } else {
      throw new Error('Error during importing transaction from csv file');
    }
  } catch (e) {
    yield put(actions.importCSVFailure());
  }
}

export default function* transactionSaga() {
  yield takeLatest(actions.fetchTransactions, fetchTransactionsSaga);
  yield takeLatest(actions.createTransaction, createTransactionSaga);
  yield takeLatest(actions.updateTransaction, updateTransactionSaga);
  yield takeLatest(actions.importCSV, importCSVSaga);
}
