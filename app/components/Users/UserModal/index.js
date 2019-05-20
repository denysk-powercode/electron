import React from 'react';
import { func, bool, object } from 'prop-types';

import UserForm from './Form';
import Modal from '../../common/Modal';

const UserModal = ({ isVisible, onClose, createUser, updateUser, isEdit, user }) => (
  <Modal isVisible={isVisible} onClose={onClose} title={isEdit ? 'Edit User' : 'Create User'}>
    <UserForm onClose={onClose} createUser={createUser} updateUser={updateUser} isEdit={isEdit} user={user} />
  </Modal>
);

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
