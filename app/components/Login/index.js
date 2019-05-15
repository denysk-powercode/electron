import React, { useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { push } from 'connected-react-router';

import { loginSuccess } from '../../store/user/actions';

const Login = ({ loginSuccess: login, push: pushRoute }) => {
  const [inputs, changeInput] = useState({ name: '', password: '' });
  const onSubmit = (e) => {
    e.preventDefault();
    if (inputs.name === '123' && inputs.password === '123') {
      login();
      pushRoute('/');
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <span>Username:</span>
        <input type="text" value={inputs.name} onChange={(e) => changeInput({ ...inputs, name: e.target.value })} />
        <span>Password:</span>
        <input
          type="text"
          value={inputs.password}
          onChange={(e) => changeInput({ ...inputs, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  loginSuccess: propTypes.func.isRequired,
  push: propTypes.func.isRequired,
};

const mapDispatchToProps = {
  loginSuccess,
  push,
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
