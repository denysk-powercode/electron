import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import HeaderControls from './Controls';

import { logout } from '../../store/auth/actions';

const Header = ({ logout }) => {
  return <HeaderControls logout={logout} />;
};

Header.propTypes = {
  logout: func.isRequired,
};

const mapDispatchToProps = {
  logout,
};

export default connect(
  null,
  mapDispatchToProps
)(Header);
