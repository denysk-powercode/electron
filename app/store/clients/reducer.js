/* eslint-disable no-param-reassign,no-unused-vars */
import * as actions from './actions';
import handleActions from '../immerHandleActions';

const initialState = {
  clientsMap: {},
  clientsIds: [],
  totalCount: 0,
  isLoading: false,
};

const clientReducer = handleActions(
  {
    [actions.fetchClients]: (draft) => {
      draft.isLoading = true;
    },
    [actions.fetchClientsSuccess]: (draft, { payload: { clients, totalCount } }) => {
      draft.isLoading = false;
      draft.totalCount = totalCount;
      draft.clientsIds = [];
      clients.forEach((client) => {
        draft.clientsMap[client.id] = client;
        draft.clientsIds.push(client.id);
      });
    },
    [actions.createClientSuccess]: (draft, { payload: { client } }) => {
      draft.clientsIds.push(client.id);
      draft.clientsMap[client.id] = client;
      draft.totalCount += 1;
    },
    [actions.updateClientSuccess]: (draft, { payload: { client } }) => {
      draft.clientsMap[client.id] = client;
    },
    [actions.fetchClientsFailure]: (draft) => {
      draft.isLoading = false;
    },
  },
  initialState
);

export default clientReducer;
