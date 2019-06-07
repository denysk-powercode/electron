import { takeLatest, put } from 'redux-saga/effects';
import qs from 'querystring';
import moment from 'moment';
import ApiService from '../../services/api';
import * as actions from './actions';
import * as paydeskActions from '../paydesk/actions';

const toQuery = (arr) => {
  const obj = arr.reduce((init, item) => {
    switch (item.id) {
      case 'created_at': {
        if (item.value.from) init.created_at__from = item.value.from.toISOString();
        if (item.value.to)
          init.created_at__to = moment(item.value.to)
            .add(59, 's')
            .toISOString();
        break;
      }
      case 'client':
      case 'user':
      case 'material': {
        const helper = item.id === 'material' ? 'title' : 'names';
        const fieldName = `$${item.id[0].toUpperCase()}${item.id.slice(1)}.${helper}$__contains`;
        if (item.value) init[fieldName] = item.value;
        break;
      }
      case 'total_weight':
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
  fetchTransactions: (offset, limit, orderField, orderDirection, filtered) => {
    const order = orderField ? `&orderBy=${orderField}&order=${orderDirection}` : '';
    const filters = filtered.length ? `&${toQuery(filtered)}` : '';
    return `/transaction/?offset=${offset}&limit=${limit}${order}${filters}`;
  },
  createTransaction: '/transaction',
  updateTransaction: (id) => `/transaction/${id}`,
  importCSV: '/transaction/import',
};

function* fetchTransactionsSaga({ payload: { offset, limit, sorted, filtered } }) {
  try {
    const orderDirection = sorted.desc ? 'desc' : 'asc';
    const response = yield ApiService.instance.get(
      apiRoutes.fetchTransactions(offset, limit, sorted.id, orderDirection, filtered)
    );
    if (response.status === 200) {
      yield put(actions.fetchTransactionsSuccess(response.data.transactions, response.data.totalCount));
    } else {
      throw new Error('Error during fetching transactions');
    }
  } catch (e) {
    yield put(actions.fetchTransactionsFailure());
  }
}

function* createTransactionSaga({ payload: { data, cb } }) {
  try {
    const response = yield ApiService.instance.post(apiRoutes.createTransaction, data);
    if (response.status === 201) {
      yield put(actions.createTransactionSuccess(response.data.transactions[0]));
      yield put(paydeskActions.checkPaydeskState());
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

export default function* transactionSaga() {
  yield takeLatest(actions.fetchTransactions, fetchTransactionsSaga);
  yield takeLatest(actions.createTransaction, createTransactionSaga);
  yield takeLatest(actions.updateTransaction, updateTransactionSaga);
}
