/* eslint-disable no-param-reassign,no-unused-vars */
import * as actions from './actions';
import handleActions from '../immerHandleActions';

const initialState = Object.freeze({
  isLoggedIn: true,
});

const userReducer = handleActions(
  {
    [actions.loginSuccess]: (draft) => {
      draft.isLoggedIn = true;
    },
    [actions.logoutSuccess]: (draft) => {
      draft.isLoggedIn = false;
    },
    [actions.resetUserState]: (draft) => {
      draft = initialState;
    },
  },
  initialState
);

export default userReducer;
