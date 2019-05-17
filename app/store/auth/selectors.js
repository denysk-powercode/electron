import { createSelector } from 'reselect';

export const getUser = (state) => state.user || {};

export const getUserItems = createSelector(
  [getUser],
  (user) => {
    return user.items;
  }
);

export const isLoading = createSelector(
  [getUser],
  (user) => {
    return user.isLoading;
  }
);
