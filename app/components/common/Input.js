import React from 'react';
import { string } from 'prop-types';
import { Field } from 'formik';
import { Input } from 'semantic-ui-react';

const CustomInput = ({ label, className, placeholder, type, ...rest }) => {
  return (
    <Field
      render={({ form: { errors, submitCount }, field }) => (
        <Input
          error={errors[field.name] && submitCount > 0}
          fluid
          label={label}
          {...field}
          className={className}
          placeholder={placeholder}
          type={type || 'text'}
        />
      )}
      {...rest}
    />
  );
};

Input.propTypes = {
  className: string,
  label: string,
  placeholder: string,
  type: string,
};

export default CustomInput;
