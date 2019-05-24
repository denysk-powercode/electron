import React, { useState, useCallback } from 'react';
import { array, bool, func, number, object } from 'prop-types';
import { connect } from 'react-redux';
import ContentWrapper from '../common/ContentWrapper';
import { fetchClients, createClient, updateClient, importCSV } from '../../store/clients/actions';
import { selectClients } from '../../store/clients/selectors';
import { useModals } from '../../hooks/useModals';

import ClientsTable from './Table';
import ClientModal from './Modal';
import TableActions from './Actions';

const Clients = ({ data, isLoading, fetchClients, createClient, updateClient, importCSV, user, totalCount }) => {
  // state
  const [pageSize, setPageSize] = useState(10);
  const [clientInQuestion, setClientInQuestion] = useState(null);
  const [modals, dispatch] = useModals('newClient', 'editClient');

  // modals
  const openNewClientModal = useCallback(() => dispatch({ type: 'OPEN', name: 'newClient' }));
  const closeNewClientModal = useCallback(() => dispatch({ type: 'CLOSE', name: 'newClient' }));
  const openEditClientModal = useCallback((client) => {
    setClientInQuestion(client);
    dispatch({ type: 'OPEN', name: 'editClient' });
  });
  const closeEditClientModal = useCallback(() => dispatch({ type: 'CLOSE', name: 'editClient' }));
  // callbacks
  const fetchData = (state) =>
    fetchClients(state.page * state.pageSize, state.pageSize, state.sorted[0], state.filtered);
  const onPageSizeChange = useCallback((pageSize) => setPageSize(pageSize));

  return (
    <ContentWrapper
      title="Clients"
      actions={!user.role ? <TableActions openNewClientModal={openNewClientModal} importCSV={importCSV} /> : null}
    >
      <ClientsTable
        data={data}
        pages={Math.ceil(totalCount / pageSize)}
        isLoading={isLoading}
        fetchData={fetchData}
        onPageSizeChange={onPageSizeChange}
        openEditClientModal={openEditClientModal}
        pageSize={pageSize}
        isAdmin={!user.role}
      />
      <ClientModal onClose={closeNewClientModal} isVisible={modals.newClient} createClient={createClient} />
      <ClientModal
        client={clientInQuestion}
        isEdit
        onClose={closeEditClientModal}
        isVisible={modals.editClient}
        updateClient={updateClient}
      />
    </ContentWrapper>
  );
};

Clients.propTypes = {
  data: array.isRequired,
  isLoading: bool.isRequired,
  fetchClients: func.isRequired,
  createClient: func.isRequired,
  updateClient: func.isRequired,
  importCSV: func.isRequired,
  totalCount: number.isRequired,
  user: object.isRequired,
};

const mapStateToProps = (state) => ({
  data: selectClients(state),
  isLoading: state.clients.isLoading,
  totalCount: state.clients.totalCount,
  user: state.app.user,
});

const mapDispatchToProps = {
  fetchClients,
  createClient,
  updateClient,
  importCSV,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients);
