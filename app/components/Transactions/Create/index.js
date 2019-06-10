import React, { useCallback } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import ContentWrapper from '../../common/ContentWrapper';
import CreateClientModal from '../../Clients/Modal';
import ConfirmationModal from './ConfirmationModal';
import NewTransactionForm from './Form';
import { fetchMaterials } from '../../../store/materials/actions';
import { fetchClients, createClient } from '../../../store/clients/actions';
import { createTransaction, setActiveTransaction, revertTransaction } from '../../../store/transactions/actions';

import routes from '../../../constants/routes';
import { useModals } from '../../../hooks/useModals';

const CreateTransaction = ({
  fetchMaterials,
  fetchClients,
  createClient,
  createTransaction,
  push,
  activeTransaction,
  setActiveTransaction,
  revertTransaction,
}) => {
  const [modals, dispatch] = useModals('client', 'confirmation');
  const loadMaterials = useCallback((inputValue, callback) => {
    fetchMaterials(0, 1000, {}, [{ id: 'title', value: inputValue }], callback);
  });
  const loadClients = useCallback((inputValue, callback) => {
    fetchClients(0, 1000, {}, [{ id: 'first_name', value: inputValue }], callback);
  });
  const goBack = (e) => {
    if (e) e.preventDefault();
    push(routes.TRANSACTIONS);
    setActiveTransaction(null);
  };
  const revert = useCallback(() =>
    revertTransaction(activeTransaction.id, (e) => {
      if (!e) goBack();
    })
  );

  return (
    <ContentWrapper title="New Transaction" backFunc={goBack}>
      <NewTransactionForm
        loadMaterials={loadMaterials}
        loadClients={loadClients}
        openClientModal={useCallback(() => dispatch({ type: 'OPEN', name: 'client' }))}
        createTransaction={createTransaction}
        goBack={goBack}
        transaction={activeTransaction}
        openConfirmation={useCallback(() => dispatch({ type: 'OPEN', name: 'confirmation' }))}
      />
      <CreateClientModal
        isVisible={modals.client}
        onClose={useCallback(() => dispatch({ type: 'CLOSE', name: 'client' }))}
        createClient={createClient}
      />
      <ConfirmationModal
        isVisible={modals.confirmation}
        onClose={useCallback(() => dispatch({ type: 'CLOSE', name: 'confirmation' }))}
        transactionId={activeTransaction?.id}
        revert={revert}
      />
    </ContentWrapper>
  );
};

CreateTransaction.propTypes = {
  fetchMaterials: func.isRequired,
  createClient: func.isRequired,
  fetchClients: func.isRequired,
  createTransaction: func.isRequired,
  setActiveTransaction: func.isRequired,
  revertTransaction: func.isRequired,
  push: func.isRequired,
  activeTransaction: object,
};

CreateTransaction.defaultProps = {
  activeTransaction: null,
};

const mapDispatchToProps = {
  fetchMaterials,
  fetchClients,
  createClient,
  createTransaction,
  setActiveTransaction,
  revertTransaction,
  push,
};

const mapStateToProps = (state) => ({
  activeTransaction: state.transactions.activeTransaction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTransaction);
