import React, { useState, useCallback } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';

import ContentWrapper from '../../common/ContentWrapper';
import CreateClientModal from '../../Clients/Modal';
import NewTransactionForm from './Form';
import { fetchMaterials } from '../../../store/materials/actions';
import { fetchClients, createClient } from '../../../store/clients/actions';

const CreateTransaction = ({ fetchMaterials, fetchClients, createClient }) => {
  const [isClientModalVisible, setModalState] = useState(false);
  const loadMaterials = useCallback((inputValue, callback) => {
    fetchMaterials(0, 1000, {}, [{ id: 'title', value: inputValue }], callback);
  });
  const loadClients = useCallback((inputValue, callback) => {
    fetchClients(0, 1000, {}, [{ id: 'first_name', value: inputValue }], callback);
  });
  return (
    <ContentWrapper title="New Transaction">
      <NewTransactionForm
        loadMaterials={loadMaterials}
        loadClients={loadClients}
        openClientModal={useCallback(() => setModalState(true))}
      />
      <CreateClientModal
        isVisible={isClientModalVisible}
        onClose={useCallback(() => setModalState(false))}
        createClient={createClient}
      />
    </ContentWrapper>
  );
};

CreateTransaction.propTypes = {
  fetchMaterials: func.isRequired,
  createClient: func.isRequired,
  fetchClients: func.isRequired,
};

const mapDispatchToProps = {
  fetchMaterials,
  fetchClients,
  createClient,
};

export default connect(
  null,
  mapDispatchToProps
)(CreateTransaction);
