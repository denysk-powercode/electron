/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const getTransactions = (state) => state.transactions.transactionsMap;
const getTransactionsIds = (state) => state.transactions.transactionsIds;

export const selectTransactions = createSelector(
  [getTransactions, getTransactionsIds],
  (transactions, ids) => ids.map((id) => transactions[id])
);
