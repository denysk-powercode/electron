import React from 'react';
import { func, object, string, oneOfType } from 'prop-types';
import styled from 'styled-components';
import { getIn } from 'formik';
import Select from 'react-select/async';

const customStyles = {
  control: (provided, state) => {
    const errStyles = {
      backgroundColor: '#fff6f6',
      borderColor: '#e0b4b4',
    };
    return state.selectProps.error ? { ...provided, ...errStyles } : provided;
  },
};

const AsyncSelect = ({ field, form, loader, placeholder, labelName, ...rest }) => (
  <StyledSelect
    error={getIn(form.errors, field.name) && form.submitCount > 0}
    getOptionLabel={typeof labelName === 'function' ? labelName : (item) => item[labelName]}
    getOptionValue={(item) => item.id}
    onChange={(value) => {
      form.setFieldValue(field.name, value);
    }}
    // don't allow to pick option that is already picked (same)
    filterOption={({ data }) => {
      const existingIds = form.values.materials.map((item) => item.id);
      return !existingIds.includes(data.id);
    }}
    value={field.value}
    isClearable={false}
    cacheOptions
    defaultOptions
    placeholder={placeholder}
    loadOptions={loader}
    styles={customStyles}
    {...rest}
  />
);

AsyncSelect.propTypes = {
  field: object.isRequired,
  form: object.isRequired,
  loader: func.isRequired,
  placeholder: string,
  labelName: oneOfType([string, func]),
};

AsyncSelect.defaultProps = {
  placeholder: '',
  labelName: 'title',
};

const StyledSelect = styled(Select)`
  min-width: 200px;
  width: 100%;
`;
export default AsyncSelect;
