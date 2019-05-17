import React from 'react';
import { func } from 'prop-types';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

const HeaderControls = ({ logout }) => {
  return (
    <Container>
      <Paydesk>Paydesk: 500</Paydesk>
      <CashControls>
        <LeftButton inverted>Add cash</LeftButton>
        <Button inverted>Withdraw cash</Button>
      </CashControls>
      <PaydeskControls>
        <LeftButton inverted>Open paydesk</LeftButton>
        <Button inverted>Close paydesk</Button>
      </PaydeskControls>
      <LogoutButton inverted onClick={logout}>
        Logout
      </LogoutButton>
    </Container>
  );
};

HeaderControls.propTypes = {
  logout: func.isRequired,
};

const Container = styled.div`
  position: sticky;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 35px;
  background-color: #0d71bb;
`;

const Paydesk = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;
const CashControls = styled.div``;
const PaydeskControls = styled.div``;
const LeftButton = styled(Button)`
  &&& {
    margin-right: 15px;
  }
`;
const LogoutButton = styled(Button)`
  align-self: flex-end;
`;
export default HeaderControls;
