import { createAction } from 'redux-actions';

export const loginSuccess = createAction('LOGIN_SUCCESS');
export const logoutSuccess = createAction('LOGOUT_SUCCESS');
export const resetUserState = createAction('RESET_USER_STATE');
