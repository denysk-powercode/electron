import { takeLatest, put } from 'redux-saga/effects';
import qs from 'querystring';
import ApiService from '../../services/api';
import * as actions from './actions';

const toQuery = (arr) => {
  const obj = arr.reduce((init, item) => {
    if (item.id === 'price') {
      init.price__from = Number(item.value.from) || 0;
      if (item.value.to) init.price__to = Number(item.value.to);
      return init;
    }
    init[`${item.id}__contains`] = item.value;
    return init;
  }, {});
  return qs.stringify(obj);
};

const apiRoutes = {
  fetchMaterials: (offset, limit, orderField, orderDirection, filtered) => {
    const order = orderField ? `&orderBy=${orderField}&order=${orderDirection}` : '';
    const filters = filtered.length ? `&${toQuery(filtered)}` : '';
    return `/material/?offset=${offset}&limit=${limit}${order}${filters}`;
  },
  createMaterial: '/material',
  updateMaterial: (id) => `/material/${id}`,
  deleteMaterial: (id) => `/material/${id}`,
};

function* fetchMaterialsSaga({ payload: { offset, limit, sorted = {}, filtered = [] } }) {
  try {
    const orderDirection = sorted.desc ? 'desc' : 'asc';
    const response = yield ApiService.instance.get(
      apiRoutes.fetchMaterials(offset, limit, sorted.id, orderDirection, filtered)
    );
    if (response.status === 200) {
      yield put(actions.fetchMaterialsSuccess(response.data.materials, response.data.totalCount));
    } else {
      throw new Error('Error during fetching materials');
    }
  } catch (e) {
    yield put(actions.fetchMaterialsFailure());
  }
}

function* createMaterialSaga({ payload: { data, cb } }) {
  try {
    const response = yield ApiService.instance.post(apiRoutes.createMaterial, data);
    if (response.status === 201) {
      yield put(actions.createMaterialSuccess(response.data.material));
      cb();
    } else {
      throw new Error('Error during material creation');
    }
  } catch (e) {
    cb(e.response.data.error || e.message || e);
    yield put(actions.createMaterialFailure());
  }
}

function* updateMaterialSaga({ payload: { data, cb } }) {
  try {
    const { id: materialId } = data;
    delete data.id;
    const response = yield ApiService.instance.patch(apiRoutes.updateMaterial(materialId), data);
    if (response.status === 202) {
      yield put(actions.updateMaterialSuccess(response.data.material));
      if (cb) cb();
    } else {
      throw new Error('Error during material update');
    }
  } catch (e) {
    if (cb) cb(e.response.data.error.message || e.message || e);
    yield put(actions.updateMaterialFailure());
  }
}

function* deleteMaterialSaga({ payload: { id, cb } }) {
  try {
    const response = yield ApiService.instance.delete(apiRoutes.deleteMaterial(id));
    if (response.status === 202) {
      cb();
      yield put(actions.deleteMaterialSuccess(id));
    } else {
      throw new Error('Error during material update');
    }
  } catch (e) {
    yield put(actions.deleteMaterialFailure());
  }
}

export default function* materialSaga() {
  yield takeLatest(actions.fetchMaterials, fetchMaterialsSaga);
  yield takeLatest(actions.createMaterial, createMaterialSaga);
  yield takeLatest(actions.updateMaterial, updateMaterialSaga);
  yield takeLatest(actions.deleteMaterial, deleteMaterialSaga);
}
