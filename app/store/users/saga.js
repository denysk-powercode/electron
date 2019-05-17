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
    const order = orderField ? `&order=${orderField}&order=${orderDirection}` : '';
    const filters = Object.entries(filtered).length ? `&${toQuery(filtered)}` : '';
    return `/user/?offset=${offset}&limit=${limit}${order}${filters}`;
  },
  deleteUser: (id) => `/user/${id}`,
  createUser: '/user',
  updateUser: (id) => `/user/${id}`,
};

function* fetchUsersSaga({ payload: { offset, limit, sorted = {}, filtered = {} } }) {
  try {
    const orderDirection = sorted.desc ? 'DESC' : 'ASC';
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

function* deleteUserSaga({ payload: { id, cb } }) {
  try {
    const response = yield ApiService.instance.delete(apiRoutes.deleteUser(id));
    if (response.status === 202) {
      yield put(actions.deleteUserSuccess(id));
      cb();
    } else {
      throw new Error('Error during user deletion');
    }
  } catch (err) {
    console.log('here');
    yield put(actions.deleteUserFailure());
    cb(err.response.data.error.message || err.message);
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
    cb(e.response.data.error.message || e.message || e || 'Error during user deletion');
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
      cb();
    } else {
      throw new Error('Error during user update');
    }
  } catch (e) {
    cb(e.response.data.error.message || e.message || e || 'Error during user deletion');
    yield put(actions.updateUserFailure());
  }
}

export default function* userSaga() {
  yield takeLatest(actions.fetchUsers, fetchUsersSaga);
  yield takeLatest(actions.deleteUser, deleteUserSaga);
  yield takeLatest(actions.createUser, createUserSaga);
  yield takeLatest(actions.updateUser, updateUserSaga);
}
