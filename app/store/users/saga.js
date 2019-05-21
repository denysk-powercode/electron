import { takeLatest, put } from 'redux-saga/effects';
import qs from 'querystring';
import ApiService from '../../services/api';
import * as actions from './actions';

const toQuery = (arr) => {
  const obj = arr.reduce((init, item) => {
    init[`${item.id}__contains`] = item.value;
    return init;
  }, {});
  return qs.stringify(obj);
};

const apiRoutes = {
  fetchUsers: (offset, limit, orderField, orderDirection, filtered) => {
    const order = orderField ? `&orderBy=${orderField}&order=${orderDirection}` : '';
    const filters = filtered.length ? `&${toQuery(filtered)}` : '';
    return `/user/?offset=${offset}&limit=${limit}${order}${filters}`;
  },
  createUser: '/user',
  updateUser: (id) => `/user/${id}`,
};

function* fetchUsersSaga({ payload: { offset, limit, sorted = {}, filtered = {} } }) {
  try {
    const orderDirection = sorted.desc ? 'desc' : 'asc';
    const response = yield ApiService.instance.get(
      apiRoutes.fetchUsers(offset, limit, sorted.id, orderDirection, filtered)
    );
    if (response.status === 200) {
      yield put(actions.fetchUsersSuccess(response.data.users, response.data.totalCount));
    } else {
      throw new Error('Error during fetching users');
    }
  } catch (e) {
    yield put(actions.fetchUsersFailure());
  }
}

function* createUserSaga({ payload: { data, cb } }) {
  try {
    const response = yield ApiService.instance.post(apiRoutes.createUser, { ...data });
    if (response.status === 201) {
      yield put(actions.createUserSuccess(response.data.user));
      cb();
    } else {
      throw new Error('Error during user creation');
    }
  } catch (e) {
    const message = e.response.data.error.includes('login')
      ? 'User already exists, just inactive'
      : e.response.data.error || e.message || e || 'Error during user deletion';
    cb(message);
    yield put(actions.createUserFailure());
  }
}

function* updateUserSaga({ payload: { data, cb } }) {
  try {
    const { id: userId } = data;
    delete data.id;
    const response = yield ApiService.instance.patch(apiRoutes.updateUser(userId), { ...data });
    if (response.status === 202) {
      yield put(actions.updateUserSuccess(response.data.user));
      if (cb) cb();
    } else {
      throw new Error('Error during user update');
    }
  } catch (e) {
    if (cb) cb(e.response.data.error.message || e.message || e || 'Error during user deletion');
    yield put(actions.updateUserFailure());
  }
}

export default function* userSaga() {
  yield takeLatest(actions.fetchUsers, fetchUsersSaga);
  yield takeLatest(actions.createUser, createUserSaga);
  yield takeLatest(actions.updateUser, updateUserSaga);
}
