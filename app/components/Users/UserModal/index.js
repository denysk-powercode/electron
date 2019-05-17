import React from 'react';
import { func, bool, object } from 'prop-types';
import { Modal } from 'semantic-ui-react';

import UserForm from './Form';

const UserModal = ({ isVisible, onClose, createUser, updateUser, isEdit, user }) => {
  return (
    <Modal open={isVisible} onClose={onClose} closeIcon closeOnDimmerClick={false}>
      <UserForm onClose={onClose} createUser={createUser} updateUser={updateUser} isEdit={isEdit} user={user} />
    </Modal>
  );
};

UserModal.propTypes = {
  isVisible: bool.isRequired,
  onClose: func.isRequired,
  createUser: func,
  updateUser: func,
  isEdit: bool,
  user: object,
};

UserModal.defaultProps = {
  createUser: undefined,
  updateUser: undefined,
  isEdit: false,
  user: null,
};

export default UserModal;
