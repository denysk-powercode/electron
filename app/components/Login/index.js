import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import LoginForm from './Form';
import { login } from '../../store/auth/actions';

const Login = ({ login }) => {
  const [inputs, changeInput] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setLoadingState] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setLoadingState(true);
    login(inputs.username, inputs.password, (e) => {
      if (e) {
        setError(e.message || e);
      }
      setLoadingState(false);
    });
  };
  const onInputChange = useCallback((e, name) => {
    setError(null);
    changeInput({ ...inputs, [name]: e.target.value });
  });
  return (
    <LoginForm
      onSubmit={onSubmit}
      username={inputs.username}
      password={inputs.password}
      onInputChange={onInputChange}
      isLoading={isLoading}
      error={error}
    />
  );
};

Login.propTypes = {
  login: propTypes.func.isRequired,
};

const mapDispatchToProps = {
  login,
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
