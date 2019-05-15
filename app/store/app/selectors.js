/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

export const getApp = (state) => state.app;

export const getLocale = createSelector(
  [getApp],
  (app) => app.locale
);
