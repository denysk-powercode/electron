/* eslint-disable no-param-reassign,no-unused-vars */
import * as actions from './actions';
import handleActions from '../immerHandleActions';

const initialState = {
  locale: 'en_US',
  user: null,
};

const userReducer = handleActions(
  {
    [actions.setLocale]: (draft, { payload: { locale } }) => {
      draft.locale = locale;
    },
    [actions.setUser]: (draft, { payload: { user } }) => {
      draft.user = user;
    },
    [actions.resetAppState]: (draft) => {
      draft.user = null;
    },
  },
  initialState
);

export default userReducer;
