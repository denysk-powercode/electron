import React from 'react';
import { string, func, bool } from 'prop-types';
import { Field, getIn } from 'formik';
import { Input } from 'semantic-ui-react';

const CustomInput = ({ label, className, placeholder, customOnChange, disabled, type, ...rest }) => {
  return (
    <Field
      render={({ form, field }) => {
        return (
          <Input
            error={getIn(form.errors, field.name) && form.submitCount > 0}
            fluid
            label={label}
            disabled={disabled}
            {...field}
            className={className}
            placeholder={placeholder}
            type={type || 'text'}
            onChange={(e) => {
              form.setFieldValue(field.name, e.target.value);
              if (customOnChange) customOnChange(e.target.value, field, form);
            }}
          />
        );
      }}
      {...rest}
    />
  );
};

Input.propTypes = {
  className: string,
  label: string,
  placeholder: string,
  type: string,
  customOnChange: func,
  disabled: bool,
};

export default CustomInput;
