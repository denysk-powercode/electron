/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const getClients = (state) => state.clients.clientsMap;
const getClientsIds = (state) => state.clients.clientsIds;

export const selectClients = createSelector(
  [getClients, getClientsIds],
  (clients, ids) => ids.map((id) => clients[id])
);
