import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import styled from 'styled-components';
import routes from '../constants/routes';
import Users from '../components/Users';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <MainHomeWrapper>
      <Header />
      <Sidebar>
        <Switch>
          <Route path={routes.TRANSACTIONS} component={() => <div>transactions</div>} />
          <Route path={routes.CLIENTS} component={() => <div>clients</div>} />
          <Route path={routes.MATERIALS} component={() => <div>materials</div>} />
          <Route path={routes.PAYDESK} component={() => <div>paydesk</div>} />
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
