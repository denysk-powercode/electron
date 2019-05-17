/* eslint-disable camelcase */
import React from 'react';
import { func, bool, object } from 'prop-types';
import { Modal, Header, Button } from 'semantic-ui-react';

import styled from 'styled-components';

const UserModal = ({ isVisible, onClose, user, deleteUser }) => {
  return (
    <Modal open={isVisible} onClose={onClose} closeIcon>
      <Container>
        <Header as="h2">Delete user</Header>
        <div>
          Are you sure you want to delete {user?.first_name} {user?.last_name}?
        </div>
        <ButtonsBlock>
          <Button primary onClick={() => deleteUser(user.id)}>
            Delete
          </Button>
          <Button onClick={onClose}>No</Button>
        </ButtonsBlock>
      </Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

const ButtonsBlock = styled.div`
  display: flex;
  align-self: flex-end;
  margin-top: 20px;
  width: 20%;
  justify-content: space-between;
`;

export default UserModal;
