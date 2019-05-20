import { createAction } from 'redux-actions';

export const fetchUsers = createAction('FETCH_USERS', (offset, limit, sorted, filtered) => ({
  offset,
  limit,
  sorted,
  filtered,
}));
export const fetchUsersSuccess = createAction('FETCH_USERS_SUCCESS', (users, totalCount) => ({ users, totalCount }));
export const fetchUsersFailure = createAction('FETCH_USERS_FAILURE');

export const createUser = createAction('CREATE_USER', (data, cb) => ({ data, cb }));
export const createUserSuccess = createAction('CREATE_USER_SUCCESS', (user) => ({ user }));
export const createUserFailure = createAction('CREATE_USER_FAILURE');

export const updateUser = createAction('UPDATE_USER', (data, cb) => ({ data, cb }));
export const updateUserSuccess = createAction('UPDATE_USER_SUCCESS', (user) => ({ user }));
export const updateUserFailure = createAction('UPDATE_USER_FAILURE');
