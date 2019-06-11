/* eslint-disable no-param-reassign,no-unused-vars */
import * as actions from './actions';
import handleActions from '../immerHandleActions';

const initialState = {
  paydeskOperationsMap: {},
  paydeskOperationsIds: [],
  totalCount: 0,
  isLoading: false,
  amount: 0,
  isOpen: false,
};

const paydeskReducer = handleActions(
  {
    [actions.fetchPaydeskOperationsSuccess]: (draft, { payload: { transactions, totalCount } }) => {
      draft.isLoading = false;
      draft.totalCount = totalCount;
      draft.paydeskOperationsIds = [];
      transactions.forEach((transaction) => {
        draft.paydeskOperationsMap[transaction.id] = transaction;
        draft.paydeskOperationsIds.push(transaction.id);
      });
    },
    [actions.openPaydeskSuccess]: (draft, { payload: { amount } }) => {
      draft.amount = Number(amount);
      draft.isOpen = true;
    },
    [actions.closePaydeskSuccess]: (draft) => {
      draft.amount = 0;
      draft.isOpen = false;
    },
    [actions.checkPaydeskStateSuccess]: (draft, { payload: { isOpen, amount } }) => {
      draft.isOpen = isOpen;
      draft.amount = amount;
    },
    [actions.addCashSuccess]: (draft, { payload: { amount } }) => {
      draft.amount += amount;
    },
    [actions.withdrawCashSuccess]: (draft, { payload: { amount } }) => {
      draft.amount -= amount;
    },
  },
  initialState
);

export default paydeskReducer;
