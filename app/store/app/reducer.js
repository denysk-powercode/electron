/* eslint-disable no-param-reassign,no-unused-vars */
import * as actions from './actions';
import handleActions from '../immerHandleActions';

const initialState = {
  locale: 'en_US',
};

const userReducer = handleActions(
  {
    [actions.setLocale]: (draft, { payload: { locale } }) => {
      draft.locale = locale;
    },
  },
  initialState
);

export default userReducer;
