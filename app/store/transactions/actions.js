import { createAction } from 'redux-actions';

export const fetchTransactions = createAction(
  'FETCH_TRANSACTIONS',
  (offset = 0, limit = 10, sorted = {}, filtered = []) => ({
    offset,
    limit,
    sorted,
    filtered,
  })
);
export const fetchTransactionsSuccess = createAction('FETCH_TRANSACTIONS_SUCCESS', (transactions, totalCount) => ({
  transactions,
  totalCount,
}));
export const fetchTransactionsFailure = createAction('FETCH_TRANSACTIONS_FAILURE');

export const createTransaction = createAction('CREATE_TRANSACTION', (data, cb) => ({ data, cb }));
export const createTransactionSuccess = createAction('CREATE_TRANSACTION_SUCCESS', (transaction) => ({ transaction }));
export const createTransactionFailure = createAction('CREATE_TRANSACTION_FAILURE');

export const updateTransaction = createAction('UPDATE_TRANSACTION', (data, cb) => ({ data, cb }));
export const updateTransactionSuccess = createAction('UPDATE_TRANSACTION_SUCCESS', (transaction) => ({ transaction }));
export const updateTransactionFailure = createAction('UPDATE_TRANSACTION_FAILURE');
