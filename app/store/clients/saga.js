import { takeLatest, put } from 'redux-saga/effects';
import qs from 'querystring';
import ApiService from '../../services/api';
import * as actions from './actions';

const toQuery = (arr) => {
  const obj = arr.reduce((init, item) => {
    if (item.id === 'total_price') {
      init.client_total_price__from_agg = Number(item.value.from) || 0;
      if (item.value.to) init.client_total_price__to_agg = Number(item.value.to);
      return init;
    }
    if (item.value !== '') init[`${item.id}__contains`] = item.value;
    return init;
  }, {});
  return qs.stringify(obj);
};

const apiRoutes = {
  fetchClients: (offset, limit, orderField, orderDirection, filtered) => {
    const order = orderField ? `&orderBy=${orderField}&order=${orderDirection}` : '';
    const filters = filtered.length ? `&${toQuery(filtered)}` : '';
    return `/client/?offset=${offset}&limit=${limit}${order}${filters}`;
  },
  createClient: '/client',
  updateClient: (id) => `/client/${id}`,
  importCSV: '/client/import',
};

function* fetchClientsSaga({ payload: { offset, limit, sorted, filtered, cb } }) {
  try {
    const orderDirection = sorted.desc ? 'desc' : 'asc';
    const response = yield ApiService.instance.get(
      apiRoutes.fetchClients(offset, limit, sorted.id, orderDirection, filtered)
    );
    if (response.status === 200) {
      yield put(actions.fetchClientsSuccess(response.data.clients, response.data.totalCount));
      if (cb) cb(response.data.clients);
    } else {
      throw new Error('Error during fetching clients');
    }
  } catch (e) {
    if (cb) cb(e.response || e.message || e);
    yield put(actions.fetchClientsFailure());
  }
}

function* createClientSaga({ payload: { data, cb } }) {
  try {
    const response = yield ApiService.instance.post(apiRoutes.createClient, data);
    if (response.status === 201) {
      yield put(actions.createClientSuccess(response.data.client));
      cb();
    } else {
      throw new Error('Error during client creation');
    }
  } catch (e) {
    cb(e.response.data.error || e.message || e);
    yield put(actions.createClientFailure());
  }
}

function* updateClientSaga({ payload: { data, cb } }) {
  try {
    const { id: clientId } = data;
    delete data.id;
    const response = yield ApiService.instance.patch(apiRoutes.updateClient(clientId), data);
    if (response.status === 202) {
      yield put(actions.updateClientSuccess(response.data.client));
      if (cb) cb();
    } else {
      throw new Error('Error during client update');
    }
  } catch (e) {
    if (cb) cb(e.response.data.error.message || e.message || e);
    yield put(actions.updateClientFailure());
  }
}

function* importCSVSaga({ payload: { file } }) {
  try {
    const formData = new FormData();
    formData.append('csv', file);
    const response = yield ApiService.instance.post(apiRoutes.importCSV, formData);
    if (response.status === 202) {
      yield put(actions.importCSVSuccess());
      yield put(actions.fetchClients());
    } else {
      throw new Error('Error during importing client from csv file');
    }
  } catch (e) {
    yield put(actions.importCSVFailure());
  }
}

export default function* clientSaga() {
  yield takeLatest(actions.fetchClients, fetchClientsSaga);
  yield takeLatest(actions.createClient, createClientSaga);
  yield takeLatest(actions.updateClient, updateClientSaga);
  yield takeLatest(actions.importCSV, importCSVSaga);
}
