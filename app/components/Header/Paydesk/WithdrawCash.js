import React from 'react';
import { func, bool, number } from 'prop-types';
import styled from 'styled-components';
import { Input, Button, TextArea } from 'semantic-ui-react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import Modal from '../../common/Modal';

const WithdrawCashSchema = Yup.object().shape({
  amount: Yup.number()
    .positive('Cannot be negative')
    .required('Amount is required'),
  source: Yup.string().required('Source is required'),
  additional_info: Yup.string(),
});

const WithdrawCash = ({ isVisible, onClose, currentPaydeskAmount, onWithdrawCash }) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Withdraw cash">
      <Formik
        initialValues={{ amount: '', source: '', additional_info: '' }}
        validationSchema={WithdrawCashSchema}
        onSubmit={(values) => {
          onWithdrawCash(values);
        }}
        render={({ handleSubmit, handleChange, values, errors, submitCount }) => (
          <StyledForm onSubmit={handleSubmit}>
            <ContentWrapper>
              <InputsBlock>
                <StyledInput
                  type="number"
                  name="amount"
                  label="Amount"
                  onChange={handleChange}
                  value={values.amount}
                  placeholder="Amount to add"
                  error={submitCount > 0 && errors.amount}
                />
                <StyledInput
                  name="source"
                  onChange={handleChange}
                  value={values.source}
                  label="Source"
                  placeholder="Provide source"
                  error={submitCount > 0 && errors.source}
                />
                <TextAreaBlock>
                  <TextAreaLabel>Additional Info</TextAreaLabel>
                  <div className="ui form" style={{ flexGrow: 1, width: '100%' }}>
                    <StyledTextArea
                      onChange={handleChange}
                      value={values.additional_info}
                      name="additional_info"
                      placeholder="Additional info"
                      rows={6}
                    />
                  </div>
                </TextAreaBlock>
              </InputsBlock>
              <InfoBlock>
                <StyledLabel>Amount now: {currentPaydeskAmount}</StyledLabel>
                <StyledLabel>Amount after: {currentPaydeskAmount - values.amount}</StyledLabel>
              </InfoBlock>
            </ContentWrapper>
            <ButtonsWrapper>
              <StyledButton primary content="Ok" />
              <StyledButton content="Cancel" onClick={onClose} />
            </ButtonsWrapper>
          </StyledForm>
        )}
      />
    </Modal>
  );
};

WithdrawCash.propTypes = {
  isVisible: bool.isRequired,
  onClose: func.isRequired,
  onWithdrawCash: func.isRequired,
  currentPaydeskAmount: number.isRequired,
};

const StyledForm = styled(Form)`
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
