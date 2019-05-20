/* eslint-disable camelcase */
import React from 'react';
import { func, bool, object } from 'prop-types';
import { Button } from 'semantic-ui-react';

import styled from 'styled-components';
import Modal from '../../common/Modal';

const UserModal = ({ isVisible, onClose, user, deleteUser }) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Delete user">
      <span>
        Are you sure you want to delete {user?.first_name} {user?.last_name}?
      </span>
      <ButtonsBlock>
        <Button primary onClick={() => deleteUser(user.id)}>
          Delete
        </Button>
        <Button onClick={onClose}>No</Button>
      </ButtonsBlock>
    </Modal>
  );
};

UserModal.propTypes = {
  isVisible: bool.isRequired,
  onClose: func.isRequired,
  deleteUser: func.isRequired,
  user: object,
};

UserModal.defaultProps = {
  user: null,
};

const ButtonsBlock = styled.div`
  display: flex;
  align-self: flex-end;
  margin-top: 20px;
  width: 20%;
  justify-content: space-between;
`;

export default UserModal;
