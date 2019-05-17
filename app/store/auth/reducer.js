/* eslint-disable no-param-reassign,no-unused-vars */
import * as actions from './actions';
import handleActions from '../immerHandleActions';

const initialState = {
  isLoggedIn: false,
};

const userReducer = handleActions(
  {
    [actions.loginSuccess]: (draft) => {
      draft.isLoggedIn = true;
    },
    [actions.logoutSuccess]: (draft) => {
      draft.isLoggedIn = false;
    },
  },
  initialState
);

export default userReducer;
