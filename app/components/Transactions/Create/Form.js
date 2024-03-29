import React from 'react';
import { func, object } from 'prop-types';
import { FieldArray, Form, Field } from 'formik';
import { Button, Icon, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';

import formikHoc from './formik';
import CustomInput from '../../common/Input';
import AsyncSelect from '../../common/AsyncSelect';
import ErrorDiv from '../../common/ErrorDiv';

const CreateTransactionForm = ({
  values,
  loadMaterials,
  loadClients,
  openClientModal,
  goBack,
  transaction,
  ...rest
}) => {
  const totalPrice = values.materials.reduce((init, item) => init + item.dynamicPrice, 0);
  const openModal = (e) => {
    e.preventDefault();
    openClientModal();
  };

  const isDisabled = Boolean(transaction);

  const renderFieldArray = (arrayHelpers) => (
    <LeftBlock>
      {values.materials &&
        values.materials.length > 0 &&
        values.materials.map((material, index) => (
          <MaterialRow key={material.id}>
            <InputWrapper>
              <InputLabel>Material {index + 1}</InputLabel>
              <Field
                name={`materials.${index}`}
                render={({ field, form }) => (
                  <AsyncSelect
                    isDisabled={isDisabled}
                    field={field}
                    form={form}
                    loader={loadMaterials}
                    placeholder="Material name"
                  />
                )}
              />
            </InputWrapper>
            <InputWrapper>
              <InputLabel>Weight {index + 1}</InputLabel>
              <StyledInput
                disabled={isDisabled}
                type="number"
                name={`materials.${index}.weight`}
                customOnChange={(value, field, form) => {
                  // on weight change - automatically change price input (dynamicPrice field) by multiplying
                  // weight and initial price (price per kg)
                  const initialPrice = form.values.materials[index]?.price;
                  form.setFieldValue(
                    `materials.${index}.dynamicPrice`,
                    value === 0 ? initialPrice : value * initialPrice
                  );
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <InputLabel>Price {index + 1}</InputLabel>
              <StyledInput disabled name={`materials.${index}.dynamicPrice`} />
            </InputWrapper>
            <Button
              disabled={isDisabled}
              primary
              onClick={() => arrayHelpers.remove(index)}
              icon={<Icon name="minus" />}
            />
          </MaterialRow>
        ))}
      <StyledButton
        disabled={isDisabled}
        primary
        onClick={(e) => {
          e.preventDefault();
          arrayHelpers.push({ id: Math.random(), title: '', weight: 0, price: 0, dynamicPrice: 0 });
        }}
        icon={<Icon name="add" />}
        content="Add material"
      />
    </LeftBlock>
  );

  return (
    <StyledFrom onSubmit={rest.handleSubmit}>
      <Wrapper>
        <FieldArray name="materials" render={renderFieldArray} />
        <RightBlock>
          <InputWrapper margBottom>
            <InputLabel>Client</InputLabel>
            <Field
              name="client"
              render={({ field, form }) => (
                <AsyncSelect
                  isDisabled={isDisabled}
                  field={field}
                  form={form}
                  loader={loadClients}
                  labelName={(item) => `${item.first_name} ${item.last_name}`}
                  placeholder="Client's name"
                />
              )}
            />
            <StyledButton
              disabled={isDisabled}
              leftmargin="true"
              primary
              icon={<Icon name="add" />}
              onClick={openModal}
            />
          </InputWrapper>
          <TextAreaBlock>
            <TextAreaLabel>Additional Info</TextAreaLabel>
            <Field
              render={({ form: { errors, submitCount }, field }) => (
                <div className="ui form" style={{ flexGrow: 1, width: '100%' }}>
                  <StyledTextArea
                    disabled={isDisabled}
                    error={errors[field.name] && submitCount > 0}
                    placeholder="Additional info"
                    rows={6}
                    {...field}
                  />
                </div>
              )}
              name="additional_info"
            />
          </TextAreaBlock>
        </RightBlock>
      </Wrapper>
      <Price>Total price {transaction ? -totalPrice : totalPrice}</Price>
      <ErrorDiv>{rest.errors.networkError}</ErrorDiv>
      <ButtonsBlock>
        <Button primary type="submit" content="Submit" />
        <Button content="Cancel" onClick={goBack} />
      </ButtonsBlock>
    </StyledFrom>
  );
};

CreateTransactionForm.propTypes = {
  values: object.isRequired,
  loadMaterials: func.isRequired,
  loadClients: func.isRequired,
  openClientModal: func.isRequired,
  goBack: func.isRequired,
  transaction: object,
};

CreateTransactionForm.defaultProps = {
  transaction: null,
};

const StyledFrom = styled(Form)`
  display: flex;
  flex-direction: column;
  padding-right: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftBlock = styled.div`
  display: flex;
  width: 58%;
  flex-direction: column;
`;

const RightBlock = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  margin-top: 7px;
`;

const MaterialRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 10px 10px 10px 0;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  width: 100%;
  ${(props) => props.margBottom && 'margin-bottom: 10px'}
`;

const InputLabel = styled.label`
  font-weight: bold;
  margin-right: 5px;
  min-width: ${(props) => (props.wide ? '150px' : '70px')};
`;

const StyledInput = styled(CustomInput)`
  display: flex;
  flex-grow: 1;
  &:disabled {
    opacity: 1;
  }
`;

const StyledButton = styled(Button)`
  align-self: flex-start;
  &&& {
    margin: 5px 0;
    margin-left: ${(props) => (props.leftmargin ? '10px ' : 0)};
  }
`;

const TextAreaBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
`;

const TextAreaLabel = styled.div`
  padding: 12px;
  background-color: #e8e8e8;
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

const Price = styled.div`
  width: 100%;
  font-weight: bold;
  display: flex;
  justify-content: center;
  font-size: 16px;
  margin: 25px 0;
`;

const ButtonsBlock = styled.div`
  width: 20%;
  align-self: center;
  display: flex;
  justify-content: space-between;
`;

export default formikHoc(CreateTransactionForm);
