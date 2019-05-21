import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import { Field, Form } from 'formik';
import { TextArea, Button } from 'semantic-ui-react';

import CustomInput from '../../common/Input';
import ErrorDiv from '../../common/ErrorDiv';

import formikHoc from './formik';

const MaterialForm = ({ onClose, ...rest }) => {
  return (
    <StyledForm>
      <InputsBlock>
        <StyledCustomInput label="Title" name="title" placeholder="Material name" />
        <StyledCustomInput type="number" label="Price per kg" name="price" placeholder="Price per kg" />
      </InputsBlock>
      <TextAreaBlock>
        <TextAreaLabel>Additional Info</TextAreaLabel>
        <Field
          render={({ form: { errors, submitCount }, field }) => (
            <div className="ui form" style={{ flexGrow: 1, width: '100%' }}>
              <StyledTextArea
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
      <ButtonsBlock>
        <Button type="submit" primary>
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ButtonsBlock>
      <ErrorDiv>{rest.errors.networkError}</ErrorDiv>
    </StyledForm>
  );
};

MaterialForm.propTypes = {
  onClose: func.isRequired,
  handleSubmit: func.isRequired,
};

const StyledForm = styled(Form)`
  display: flex;
  flex-wrap: wrap;
`;

const InputsBlock = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
`;

const TextAreaBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
`;

const Label = styled.div`
  padding: 12px;
  background-color: #e8e8e8;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 700;
  border-radius: 3px;
`;

const TextAreaLabel = styled(Label)`
  text-align: center;
  width: 100%;
`;

const StyledTextArea = styled(TextArea)`
  &&& {
    flex-grow: 1;
  }
`;

const ButtonsBlock = styled.div`
  display: flex;
  margin-top: 50px;
  width: 100%;
  padding: 0 30%;
  justify-content: space-evenly;
`;

const StyledCustomInput = styled(CustomInput)`
  width: 360px;
  margin-bottom: 15px;
`;

export default formikHoc(MaterialForm);
