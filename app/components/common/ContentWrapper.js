import React from 'react';
import { any, node, string } from 'prop-types';
import styled from 'styled-components';
import { Header, Segment } from 'semantic-ui-react';

const ContentWrapper = ({ children, title, actions }) => {
  return (
    <StyledSegment basic>
      <Header as="h1">{title}</Header>
      <ActionsWrapper>{actions}</ActionsWrapper>
      {children}
    </StyledSegment>
  );
};

ContentWrapper.propTypes = {
  title: string.isRequired,
  children: any.isRequired,
  actions: node,
};

ContentWrapper.defaultProps = {
  actions: null,
};

const StyledSegment = styled(Segment)`
  width: 100%;
  &&& {
    padding: 20px 40px;
  }
`;

const ActionsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export default ContentWrapper;
