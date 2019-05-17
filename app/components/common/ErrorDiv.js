import React from 'react';
import { any } from 'prop-types';
import styled from 'styled-components';

const ErrorDiv = ({ children }) => {
  return <Container>{children}</Container>;
};

ErrorDiv.propTypes = {
  children: any,
};

ErrorDiv.defaultProps = {
  children: null,
};

const Container = styled.div`
  margin: 10px 0;
  color: red;
  min-height: 15px;
`;

export default ErrorDiv;
