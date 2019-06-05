import React, { useState } from 'react';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { Input, Button } from 'semantic-ui-react';

import Modal from '../../common/Modal';

const OpenPaydesk = ({ isVisible, onClose, onOpenPaydesk }) => {
  const [input, onChange] = useState('');
  const submit = () => {
    if (!input) return;
    onOpenPaydesk(input);
  };
  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Open paydesk">
      <Container>
        <Description>
          Please insert the amount of money you received from the accountant in order to start the work
        </Description>
        <Input type="number" value={input} error={!input} placeholder="0" onChange={(e) => onChange(e.target.value)} />
        <ButtonsWrapper>
          <StyledButton primary content="Ok" onClick={submit} />
          <StyledButton content="Cancel" onClick={onClose} />
        </ButtonsWrapper>
      </Container>
    </Modal>
  );
};

OpenPaydesk.propTypes = {
  isVisible: bool.isRequired,
  onClose: func.isRequired,
  onOpenPaydesk: func.isRequired,
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

export default OpenPaydesk;
