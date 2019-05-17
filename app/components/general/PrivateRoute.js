import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isLoggedIn, location, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: propTypes.oneOfType([propTypes.func, propTypes.object]).isRequired,
  isLoggedIn: propTypes.bool.isRequired,
  location: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
