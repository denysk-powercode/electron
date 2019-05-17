/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const getUsers = (state) => state.users.userMap;
const getUsersIds = (state) => state.users.usersIds;

export const selectUsers = createSelector(
  [getUsers, getUsersIds],
  (users, ids) => ids.map((id) => users[id])
);
