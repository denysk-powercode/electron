/* eslint-disable no-param-reassign,no-unused-vars */
import * as actions from './actions';
import handleActions from '../immerHandleActions';

const initialState = {
  transactionsMap: {},
  transactionsIds: [],
  totalCount: 0,
  isLoading: false,
};

const transactionReducer = handleActions(
  {
    [actions.fetchTransactions]: (draft) => {
      draft.isLoading = true;
    },
    [actions.fetchTransactionsSuccess]: (draft, { payload: { transactions, totalCount } }) => {
      draft.isLoading = false;
      draft.totalCount = totalCount;
      draft.transactionsIds = [];
      transactions.forEach((transaction) => {
        draft.transactionsMap[transaction.id] = transaction;
        draft.transactionsIds.push(transaction.id);
      });
    },
    // [actions.createTransactionSuccess]: (draft, { payload: { transaction } }) => {
    //   draft.transactionsIds.push(transaction.id);
    //   draft.transactionsMap[transaction.id] = transaction;
    //   draft.totalCount += 1;
    // },
    [actions.updateTransactionSuccess]: (draft, { payload: { transaction } }) => {
      draft.transactionsMap[transaction.id] = transaction;
    },
    [actions.fetchTransactionsFailure]: (draft) => {
      draft.isLoading = false;
    },
  },
  initialState
);

export default transactionReducer;
