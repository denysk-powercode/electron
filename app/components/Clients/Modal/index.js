import React from 'react';
import { func, bool, object } from 'prop-types';

import ClientForm from './Form';
import Modal from '../../common/Modal';

const ClientModal = ({ isVisible, onClose, createClient, updateClient, isEdit, client }) => (
  <Modal isVisible={isVisible} onClose={onClose} title={isEdit ? 'Edit Client' : 'Create Client'}>
    <ClientForm
      onClose={onClose}
      createClient={createClient}
      updateClient={updateClient}
      isEdit={isEdit}
      client={client}
    />
  </Modal>
);

ClientModal.propTypes = {
  isVisible: bool.isRequired,
  onClose: func.isRequired,
  createClient: func,
  updateClient: func,
  isEdit: bool,
  client: object,
};

ClientModal.defaultProps = {
  createClient: undefined,
  updateClient: undefined,
  isEdit: false,
  client: null,
};

export default ClientModal;
