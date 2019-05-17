import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const SplashScreen = ({ isLoggedIn }) => (isLoggedIn ? <Redirect to="/users" /> : <Redirect to="/login" />);

SplashScreen.propTypes = {
  isLoggedIn: propTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(
  mapStateToProps,
  null
)(SplashScreen);
