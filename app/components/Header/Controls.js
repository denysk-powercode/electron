import React from 'react';
import { func, number, bool, string } from 'prop-types';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

const HeaderControls = ({
  logout,
  openPaydesk,
  closePaydesk,
  addCash,
  withdrawCash,
  currentPaydeskAmount,
  isOpen,
  userName,
}) => {
  return (
    <Container>
      <Paydesk>Paydesk: {currentPaydeskAmount}</Paydesk>
      <div>
        <LeftButton onClick={addCash} inverted>
          Add cash
        </LeftButton>
        <Button inverted onClick={withdrawCash}>
          Withdraw cash
        </Button>
      </div>
      <div>
        <LeftButton disabled={isOpen} onClick={openPaydesk} inverted>
          Open paydesk
        </LeftButton>
        <Button disabled={!isOpen} inverted onClick={closePaydesk}>
          Close paydesk
        </Button>
      </div>
      <div>
        <LoginInfo>Logged in as: {userName}</LoginInfo>
        <LogoutButton inverted onClick={logout}>
          Logout
        </LogoutButton>
      </div>
    </Container>
  );
};

HeaderControls.propTypes = {
  logout: func.isRequired,
  openPaydesk: func.isRequired,
  closePaydesk: func.isRequired,
  addCash: func.isRequired,
  withdrawCash: func.isRequired,
  currentPaydeskAmount: number.isRequired,
  isOpen: bool.isRequired,
  userName: string.isRequired,
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
const LeftButton = styled(Button)`
  margin-right: 15px;
`;
const LogoutButton = styled(Button)`
  align-self: flex-end;
  margin-left: 20px;
`;

const LoginInfo = styled.span`
  color: #fff;
  font-size: 16px;
  margin-right: 15px;
`;
export default HeaderControls;
