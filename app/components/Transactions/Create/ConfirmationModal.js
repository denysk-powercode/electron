import React from 'react';
import { func, bool, number, string, oneOfType } from 'prop-types';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

import Modal from '../../common/Modal';

const ConfirmationModal = ({ isVisible, onClose, transactionId, revert }) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Revert transaction">
      <p>Are you sure you want to cancel transaction № {transactionId} ?</p>
      <p>This action will create a duplicate transaction but with the negative value.</p>
      <ButtonsBlock>
        <Button primary type="submit" content="Yes" onClick={revert} />
        <Button content="No" onClick={onClose} />
      </ButtonsBlock>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  isVisible: bool.isRequired,
  onClose: func.isRequired,
  transactionId: oneOfType([number, string]),
  revert: func.isRequired,
};

ConfirmationModal.defaultProps = {
  transactionId: '',
};

const ButtonsBlock = styled.div`
  width: 20%;
  align-self: center;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export default ConfirmationModal;
