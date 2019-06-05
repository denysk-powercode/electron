import { createAction } from 'redux-actions';

export const openPaydesk = createAction('OPEN_PAYDESK', (amount, cb) => ({ amount, cb }));
export const openPaydeskSuccess = createAction('OPEN_PAYDESK_SUCCESS', (amount) => ({ amount }));
export const openPaydeskFailure = createAction('OPEN_PAYDESK_FAILURE');

export const closePaydesk = createAction('CLOSE_PAYDESK', (amount, cb) => ({ amount, cb }));
export const closePaydeskSuccess = createAction('CLOSE_PAYDESK_SUCCESS');
export const closePaydeskFailure = createAction('CLOSE_PAYDESK_FAILURE');
