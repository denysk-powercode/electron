import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Login from '../components/Login';
import SplashScreen from '../components/common/SplashScreen';
import PrivateRoute from '../components/common/PrivateRoute';
import Demo from '../components/Demo';

const Main = () => {
  return (
    <div>
      <Switch>
        <Route path="/demo" component={Demo} />
        <Route path="/about" component={() => <div>about</div>} />
        <Route path="/details" component={() => <div>details</div>} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={SplashScreen} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/" component={Main} />
    </Switch>
  );
};

export default App;
