import { createAction } from 'redux-actions';

export const login = createAction('LOGIN', (username, password, cb) => ({ username, password, cb }));
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginFailure = createAction('LOGIN_FAILURE');

export const logout = createAction('LOGOUT');
export const logoutSuccess = createAction('LOGOUT_SUCCESS');
export const logoutFailure = createAction('LOGOUT_FAILURE');
