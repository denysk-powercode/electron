import React, { useState, useCallback } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import ContentWrapper from '../../common/ContentWrapper';
import CreateClientModal from '../../Clients/Modal';
import NewTransactionForm from './Form';
import { fetchMaterials } from '../../../store/materials/actions';
import { fetchClients, createClient } from '../../../store/clients/actions';
import { fetchTransactions, createTransaction } from '../../../store/transactions/actions';

import routes from '../../../constants/routes';

const CreateTransaction = ({
  fetchMaterials,
  fetchClients,
  fetchTransactions,
  createClient,
  createTransaction,
  push,
}) => {
  const [isClientModalVisible, setModalState] = useState(false);
  const loadMaterials = useCallback((inputValue, callback) => {
    fetchMaterials(0, 1000, {}, [{ id: 'title', value: inputValue }], callback);
  });
  const loadClients = useCallback((inputValue, callback) => {
    fetchClients(0, 1000, {}, [{ id: 'first_name', value: inputValue }], callback);
  });
  const loadTransactions = useCallback((inputValue, callback) => {
    fetchTransactions(0, 1000, {}, [{ id: 'id', value: inputValue }], callback);
  });
  const goBack = (e) => {
    if (e) e.preventDefault();
    push(routes.TRANSACTIONS);
  };
  return (
    <ContentWrapper title="New Transaction">
      <NewTransactionForm
        loadMaterials={loadMaterials}
        loadClients={loadClients}
        loadTransactions={loadTransactions}
        openClientModal={useCallback(() => setModalState(true))}
        createTransaction={createTransaction}
        goBack={goBack}
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
  fetchTransactions: func.isRequired,
  createTransaction: func.isRequired,
  push: func.isRequired,
};

const mapDispatchToProps = {
  fetchMaterials,
  fetchClients,
  createClient,
  fetchTransactions,
  createTransaction,
  push,
};

export default connect(
  null,
  mapDispatchToProps
)(CreateTransaction);
