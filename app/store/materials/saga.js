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
    if (item.id === 'id') {
      init.material_id__contains_agg = item.value;
      return init;
    }
    if (item.value !== '') init[`${item.id}__contains`] = item.value;
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
  importCSV: '/material/import',
};

function* fetchMaterialsSaga({ payload: { offset, limit, sorted, filtered, cb } }) {
  try {
    const orderDirection = sorted.desc ? 'desc' : 'asc';
    const response = yield ApiService.instance.get(
      apiRoutes.fetchMaterials(offset, limit, sorted.id, orderDirection, filtered)
    );
    if (response.status === 200) {
      if (cb) cb(response.data.materials.map((item) => ({ ...item, weight: 1, dynamicPrice: item.price })));
      yield put(actions.fetchMaterialsSuccess(response.data.materials, response.data.totalCount));
    } else {
      throw new Error('Error during fetching materials');
    }
  } catch (e) {
    if (cb) cb(e.response || e.message || e);
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

function* importCSVSaga({ payload: { file } }) {
  try {
    const formData = new FormData();
    formData.append('csv', file);
    const response = yield ApiService.instance.post(apiRoutes.importCSV, formData);
    if (response.status === 202) {
      yield put(actions.importCSVSuccess());
      yield put(actions.fetchMaterials());
    } else {
      throw new Error('Error during importing material from csv file');
    }
  } catch (e) {
    yield put(actions.importCSVFailure());
  }
}

export default function* materialSaga() {
  yield takeLatest(actions.fetchMaterials, fetchMaterialsSaga);
  yield takeLatest(actions.createMaterial, createMaterialSaga);
  yield takeLatest(actions.updateMaterial, updateMaterialSaga);
  yield takeLatest(actions.importCSV, importCSVSaga);
}
