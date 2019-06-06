import { createAction } from 'redux-actions';

export const fetchClients = createAction('FETCH_CLIENTS', (offset = 0, limit = 10, sorted = {}, filtered = [], cb) => ({
  offset,
  limit,
  sorted,
  filtered,
  cb,
}));
export const fetchClientsSuccess = createAction('FETCH_CLIENTS_SUCCESS', (clients, totalCount) => ({
  clients,
  totalCount,
}));
export const fetchClientsFailure = createAction('FETCH_CLIENTS_FAILURE');

export const createClient = createAction('CREATE_CLIENT', (data, cb) => ({ data, cb }));
export const createClientSuccess = createAction('CREATE_CLIENT_SUCCESS', (client) => ({ client }));
export const createClientFailure = createAction('CREATE_CLIENT_FAILURE');

export const updateClient = createAction('UPDATE_CLIENT', (data, cb) => ({ data, cb }));
export const updateClientSuccess = createAction('UPDATE_CLIENT_SUCCESS', (client) => ({ client }));
export const updateClientFailure = createAction('UPDATE_CLIENT_FAILURE');

export const importCSV = createAction('IMPORT_CLIENTS_CSV', (file, pageSize) => ({ file, pageSize }));
export const importCSVSuccess = createAction('IMPORT_CLIENTS_CSV_SUCCESS');
export const importCSVFailure = createAction('IMPORT_CLIENTS_CSV_FAILURE');
