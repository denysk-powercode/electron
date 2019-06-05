import React from 'react';
import { func, bool, number } from 'prop-types';
import styled from 'styled-components';
import { Input, Button, TextArea } from 'semantic-ui-react';

import Modal from '../../common/Modal';
import { useInputs } from '../../../hooks/useInputs';

const WithdrawCash = ({ isVisible, onClose, currentPaydeskAmount }) => {
  const inputs = useInputs('amount', 'source', 'info');
  const amountAfter = Number(currentPaydeskAmount) - Number(inputs.amount.value);
  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Withdraw cash">
      <Container>
        <ContentWrapper>
          <InputsBlock>
            <StyledInput type="number" label="Amount" {...inputs.amount} placeholder="Amount to withdraw" />
            <StyledInput label="Source" {...inputs.source} placeholder="Withdrawal source" />
            <TextAreaBlock>
              <TextAreaLabel>Additional Info</TextAreaLabel>
              <div className="ui form" style={{ flexGrow: 1, width: '100%' }}>
                <StyledTextArea placeholder="Additional info" rows={6} {...inputs.info} />
              </div>
            </TextAreaBlock>
          </InputsBlock>
          <InfoBlock>
            <StyledLabel>Amount now: {currentPaydeskAmount}</StyledLabel>
            <StyledLabel>Amount after: {amountAfter}</StyledLabel>
          </InfoBlock>
        </ContentWrapper>

        <ButtonsWrapper>
          <StyledButton primary content="Ok" />
          <StyledButton content="Cancel" onClick={onClose} />
        </ButtonsWrapper>
      </Container>
    </Modal>
  );
};

WithdrawCash.propTypes = {
  isVisible: bool.isRequired,
  onClose: func.isRequired,
  currentPaydeskAmount: number.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const InputsBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const StyledInput = styled(Input)`
  margin-bottom: 15px;
  width: 75%;
`;

const TextAreaBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 75%;
`;

const TextAreaLabel = styled.label`
  padding: 12px;
  background-color: #e8e8e8;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 700;
  border-radius: 3px;
  text-align: center;
  width: 100%;
`;

const StyledTextArea = styled(TextArea)`
  &&& {
    flex-grow: 1;
  }
`;
const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const ButtonsWrapper = styled.div`
  width: 30%;
  align-self: center;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const StyledButton = styled(Button)`
  min-width: 80px;
`;

export default WithdrawCash;
