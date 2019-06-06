import React from 'react';
import { any, node, string, func } from 'prop-types';
import styled from 'styled-components';
import { Header, Segment, Button } from 'semantic-ui-react';

const ContentWrapper = ({ children, title, actions, backFunc }) => {
  return (
    <StyledSegment basic>
      <HeaderWrapper>
        {backFunc && <Button icon="chevron left" onClick={backFunc} />}
        <StyledHeader as="h1" withMargin={Boolean(backFunc)}>
          {title}
        </StyledHeader>
      </HeaderWrapper>
      <ActionsWrapper>{actions}</ActionsWrapper>
      {children}
    </StyledSegment>
  );
};

ContentWrapper.propTypes = {
  title: string.isRequired,
  children: any.isRequired,
  actions: node,
  backFunc: func,
};

ContentWrapper.defaultProps = {
  actions: null,
  backFunc: undefined,
};

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
`;

const StyledHeader = styled(Header)`
  margin-top: 0;
  ${(props) => props.withMargin && 'margin-left: 10px'}
`;

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
