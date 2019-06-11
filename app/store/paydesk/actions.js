import { createAction } from 'redux-actions';

export const openPaydesk = createAction('OPEN_PAYDESK', (amount, cb) => ({ amount, cb }));
export const openPaydeskSuccess = createAction('OPEN_PAYDESK_SUCCESS', (amount) => ({ amount }));
export const openPaydeskFailure = createAction('OPEN_PAYDESK_FAILURE');

export const closePaydesk = createAction('CLOSE_PAYDESK', (amount, cb) => ({ amount, cb }));
export const closePaydeskSuccess = createAction('CLOSE_PAYDESK_SUCCESS');
export const closePaydeskFailure = createAction('CLOSE_PAYDESK_FAILURE');

export const checkPaydeskState = createAction('CHECK_PAYDESK_STATE');
export const checkPaydeskStateSuccess = createAction('CHECK_PAYDESK_STATE_SUCCESS', (isOpen, amount) => ({
  isOpen,
  amount,
}));
export const checkPaydeskStateFailure = createAction('CHECK_PAYDESK_STATE_FAILURE');

export const addCash = createAction('ADD_CASH', (data, cb) => ({ data, cb }));
export const addCashSuccess = createAction('ADD_CASH_SUCCESS', (amount) => ({ amount }));
export const addCashFailure = createAction('ADD_CASH_FAILURE');

export const withdrawCash = createAction('WITHDRAW_CASH', (data, cb) => ({ data, cb }));
export const withdrawCashSuccess = createAction('WITHDRAW_CASH_SUCCESS', (amount) => ({ amount }));
export const withdrawCashFailure = createAction('WITHDRAW_CASH_FAILURE');

export const fetchPaydeskOperations = createAction(
  'FETCH_PAYDESK_OPERATIONS',
  (offset = 0, limit = 10, sorted = {}, filtered = []) => ({
    offset,
    limit,
    sorted,
    filtered,
  })
);
export const fetchPaydeskOperationsSuccess = createAction(
  'FETCH_PAYDESK_OPERATIONS_SUCCESS',
  (transactions, totalCount) => ({
    transactions,
    totalCount,
  })
);
export const fetchPaydeskOperationsFailure = createAction('FETCH_PAYDESK_OPERATIONS_FAILURE');
