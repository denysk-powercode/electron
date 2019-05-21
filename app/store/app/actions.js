/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';

export const setLocale = createAction('APP/SET_LOCALE', (locale) => ({ locale }));
export const setUser = createAction('SET_USER', (user) => ({ user }));
export const resetAppState = createAction('RESET_APP_STATE');
