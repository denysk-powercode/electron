/* eslint-disable no-param-reassign,no-unused-vars */
import * as actions from './actions';
import handleActions from '../immerHandleActions';

const initialState = {
  amount: 0,
  isOpen: false,
};

const paydeskReducer = handleActions(
  {
    [actions.openPaydeskSuccess]: (draft, { payload: { amount } }) => {
      draft.amount = amount;
      draft.isOpen = true;
    },
    [actions.closePaydeskSuccess]: (draft) => {
      draft.amount = 0;
      draft.isOpen = false;
    },
  },
  initialState
);

export default paydeskReducer;
