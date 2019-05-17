import { takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ApiService from '../../services/api';
import StorageService from '../../services/storage';
import * as actions from './actions';
import routes from '../../constants/routes';

const apiRoutes = {
  login: '/token',
  logout: '/token',
};

function* loginSaga({ payload: { username, password, cb } }) {
  try {
    const data = { login: username, password };
    const response = yield ApiService.instance.post(apiRoutes.login, data);
    if (response.status === 201) {
      StorageService.set('token', response.data.token);
      ApiService.resetToken(response.data.token);
      yield put(actions.loginSuccess());
      yield put(push(routes.HOME));
    } else {
      throw new Error('Error during login');
    }
  } catch (e) {
    yield put(actions.loginFailure());
    cb(e.response.data.error.message || e.message);
  }
}

function* logoutSaga() {
  try {
    const response = yield ApiService.instance.delete(apiRoutes.logout);
    if (response.status === 202) {
      StorageService.set('token', null);
      yield put(actions.logoutSuccess());
      yield put(push(routes.LOGIN));
    } else {
      throw new Error('Error during logout');
    }
  } catch (e) {
    yield put(actions.logoutFailure());
  }
}

export default function* userSaga() {
  yield takeLatest(actions.login, loginSaga);
  yield takeLatest(actions.logout, logoutSaga);
}
