import React from 'react';
import { func, string, bool } from 'prop-types';
import styled from 'styled-components';
import { Input, Button } from 'semantic-ui-react';

import ErrorDiv from '../common/ErrorDiv';

const LoginForm = ({ onSubmit, username, password, onInputChange, isLoading, error }) => {
  return (
    <Container>
      <StyledForm onSubmit={onSubmit}>
        <StyledInput
          label="Username:"
          placeholder="type in your username..."
          value={username}
          onChange={(e) => onInputChange(e, 'username')}
        />
        <StyledInput
          label="Password:"
          type="password"
          placeholder="type in your password..."
          value={password}
          onChange={(e) => onInputChange(e, 'password')}
        />
        <StyledButton primary type="submit" loading={isLoading}>
          {isLoading ? 'ss' : 'Login'}
        </StyledButton>
        <ErrorDiv>{error}</ErrorDiv>
      </StyledForm>
    </Container>
  );
};

LoginForm.propTypes = {
  onSubmit: func.isRequired,
  onInputChange: func.isRequired,
  username: string.isRequired,
  password: string.isRequired,
  error: string,
  isLoading: bool.isRequired,
};

LoginForm.defaultProps = {
  error: null,
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledInput = styled(Input)`
  margin-bottom: 10px;
  min-width: 300px;
`;
const StyledButton = styled(Button)`
  min-width: 200px;
`;
export default LoginForm;
