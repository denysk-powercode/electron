import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import styled from 'styled-components';
import routes from '../constants/routes';
import Users from '../components/Users';
import Materials from '../components/Materials';
import Clients from '../components/Clients';
import Transactions from '../components/Transactions';
import PaydeskOperations from '../components/Paydesk';
import NewTransaction from '../components/Transactions/Create';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <MainHomeWrapper>
      <Header />
      <Sidebar>
        <Switch>
          <Route path={routes.TRANSACTIONS} exact component={Transactions} />
          <Route path={routes.NEW_TRANSACTION} component={NewTransaction} />
          <Route path={routes.CLIENTS} component={Clients} />
          <Route path={routes.MATERIALS} component={Materials} />
          <Route path={routes.PAYDESK} component={PaydeskOperations} />
          <Route path={routes.USERS} component={Users} />
          <Redirect to={routes.HOME} />
        </Switch>
      </Sidebar>
    </MainHomeWrapper>
  );
};

const MainHomeWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default Home;
