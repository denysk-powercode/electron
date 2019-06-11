/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const getPaydeskOperations = (state) => state.paydesk.paydeskOperationsMap;
const getPaydeskOperationsIds = (state) => state.paydesk.paydeskOperationsIds;

export const selectPaydeskOperations = createSelector(
  [getPaydeskOperations, getPaydeskOperationsIds],
  (paydeskOperations, ids) => ids.map((id) => paydeskOperations[id])
);
