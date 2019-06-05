import React from 'react';
import { func, number } from 'prop-types';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

const HeaderControls = ({ logout, openPaydesk, closePaydesk, addCash, withdrawCash, currentPaydeskAmount }) => {
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
        <LeftButton onClick={openPaydesk} inverted>
          Open paydesk
        </LeftButton>
        <Button inverted onClick={closePaydesk}>
          Close paydesk
        </Button>
      </div>
      <LogoutButton inverted onClick={logout}>
        Logout
      </LogoutButton>
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
`;
export default HeaderControls;
