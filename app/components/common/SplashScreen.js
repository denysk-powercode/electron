import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const SplashScreen = ({ isLoggedIn }) => (isLoggedIn ? <Redirect to="/demo" /> : <Redirect to="/login" />);

SplashScreen.propTypes = {
  isLoggedIn: propTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(
  mapStateToProps,
  null
)(SplashScreen);
