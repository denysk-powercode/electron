/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';

export const setLocale = createAction('APP/SET_LOCALE', (locale) => ({ locale }));
