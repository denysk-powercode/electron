/* eslint-disable no-param-reassign,no-unused-vars */
import * as actions from './actions';
import handleActions from '../immerHandleActions';

const initialState = {
  usersMap: {},
  usersIds: [],
  totalCount: 0,
  isLoading: false,
};

const userReducer = handleActions(
  {
    [actions.fetchUsers]: (draft) => {
      draft.isLoading = true;
    },
    [actions.fetchUsersSuccess]: (draft, { payload: { users, totalCount } }) => {
      draft.isLoading = false;
      draft.totalCount = totalCount;
      draft.usersIds = [];
      users.forEach((user) => {
        draft.usersMap[user.id] = user;
        draft.usersIds.push(user.id);
      });
    },
    [actions.createUserSuccess]: (draft, { payload: { user } }) => {
      draft.usersIds.push(user.id);
      draft.usersMap[user.id] = user;
      draft.totalCount += 1;
    },
    [actions.updateUserSuccess]: (draft, { payload: { user } }) => {
      draft.usersMap[user.id] = user;
    },
    [actions.fetchUsersFailure]: (draft) => {
      draft.isLoading = false;
    },
  },
  initialState
);

export default userReducer;
