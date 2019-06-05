import React from 'react';
import { func, bool, number } from 'prop-types';
import styled from 'styled-components';
import { Input, Button } from 'semantic-ui-react';

import Modal from '../../common/Modal';

const ClosePaydesk = ({ isVisible, onClose, currentPaydeskAmount, closePaydesk }) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Close paydesk">
      <Container>
        <Description>
          Currently, you should have {currentPaydeskAmount}€ in your paydesk. Please check it and insert the amount of
          money you gave back to the accountant in order to finish the work.
        </Description>
        <Input disabled type="number" value={currentPaydeskAmount} />
        <ButtonsWrapper>
          <StyledButton primary content="Ok" onClick={closePaydesk} />
          <StyledButton content="Cancel" onClick={onClose} />
        </ButtonsWrapper>
      </Container>
    </Modal>
  );
};

ClosePaydesk.propTypes = {
  isVisible: bool.isRequired,
  onClose: func.isRequired,
  closePaydesk: func.isRequired,
  currentPaydeskAmount: number.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  max-width: 40%;
`;
const Description = styled.div`
  margin-bottom: 30px;
  text-align: center;
  line-height: 18px;
`;

const ButtonsWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const StyledButton = styled(Button)`
  min-width: 80px;
`;

export default ClosePaydesk;
