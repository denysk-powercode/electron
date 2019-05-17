import React from 'react';
import { Switch, Route } from 'react-router';
import routes from '../constants/routes';
import Login from '../components/Login';
import SplashScreen from '../components/general/SplashScreen';
import PrivateRoute from '../components/general/PrivateRoute';
import Home from './home';

const App = () => {
  return (
    <Switch>
      <Route exact path={routes.HOME} component={SplashScreen} />
      <Route path={routes.LOGIN} component={Login} />
      <PrivateRoute path={routes.HOME} component={Home} />
    </Switch>
  );
};

export default App;
