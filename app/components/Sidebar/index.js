import React, { useCallback } from 'react';
import { any, string, func } from 'prop-types';
import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import options from '../../constants/sidebarList';

const Sidebar = ({ children, currentRoute, push }) => {
  const onItemClick = (route) => push(route);
  return (
    <Container>
      <StyledMenu vertical>
        {options.map((option) => {
          return (
            <StyledItem
              key={option.name}
              name={option.name}
              active={currentRoute === option.route}
              onClick={useCallback(() => onItemClick(option.route))}
            />
          );
        })}
      </StyledMenu>
      {children}
    </Container>
  );
};

Sidebar.propTypes = {
  children: any.isRequired,
  currentRoute: string.isRequired,
  push: func.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-grow: 1;
`;

const StyledMenu = styled(Menu)`
  &&& {
    margin: 0;
    min-width: 240px;
  }
`;

const StyledItem = styled(Menu.Item)`
  font-size: 16px;
  text-align: center;
  &&&& {
    padding: 20px;
  }
`;

const mapStateToProps = (state) => ({
  currentRoute: state.router.location.pathname,
});

const mapDispatchToProps = {
  push,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
