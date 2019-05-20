import React from 'react';
import { func, bool, any, string } from 'prop-types';
import { Modal, Header } from 'semantic-ui-react';
import styled from 'styled-components';

const UserModal = ({ isVisible, onClose, title, children }) => {
  return (
    <Modal open={isVisible} onClose={onClose} closeIcon closeOnDimmerClick={false}>
      <Container>
        <StyledHeader as="h2">{title}</StyledHeader>
        {children}
      </Container>
    </Modal>
  );
};

UserModal.propTypes = {
  isVisible: bool.isRequired,
  onClose: func.isRequired,
  title: string,
  children: any,
};

UserModal.defaultProps = {
  children: null,
  title: '',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const StyledHeader = styled(Header)`
  margin-bottom: 40px;
  align-self: center;
`;

export default UserModal;
