import React, { useState, useCallback, useEffect } from 'react';
import { push } from 'connected-react-router';
import { array, bool, func, number, object } from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import ContentWrapper from '../common/ContentWrapper';
import UsersTable from './Table/Table';
import { fetchUsers, createUser, updateUser } from '../../store/users/actions';
import { selectUsers } from '../../store/users/selectors';
import { useModals } from '../../hooks/useModals';

import UserModal from './UserModal';
import ROUTES from '../../constants/routes';

const Users = ({ data, user, isLoading, fetchUsers, createUser, updateUser, totalCount, push }) => {
  useEffect(() => {
    if (user.role) push(ROUTES.PAYDESK);
  }, []);
  // state
  const [pageSize, setPageSize] = useState(10);
  const [userInQuestion, setUserInQuestion] = useState(null);
  const [modals, dispatch] = useModals('newUser', 'editUser');

  // modals
  const openNewUserModal = useCallback(() => dispatch({ type: 'OPEN', name: 'newUser' }));
  const closeNewUserModal = useCallback(() => dispatch({ type: 'CLOSE', name: 'newUser' }));
  const openEditUserModal = useCallback((user) => {
    setUserInQuestion(user);
    dispatch({ type: 'OPEN', name: 'editUser' });
  });
  const closeEditUserModal = useCallback(() => dispatch({ type: 'CLOSE', name: 'editUser' }));

  // callbacks
  const fetchData = (state) => fetchUsers(state.page * state.pageSize, state.pageSize, state.sorted[0], state.filtered);
  const onPageSizeChange = useCallback((pageSize) => setPageSize(pageSize));
  const changeUserStatus = useCallback((id, newStatus) => updateUser({ is_active: newStatus, id }));

  return (
    <ContentWrapper
      title="Users"
      actions={
        <Button onClick={openNewUserModal} primary>
          New
        </Button>
      }
    >
      <UsersTable
        data={data}
        pages={Math.ceil(totalCount / pageSize)}
        isLoading={isLoading}
        fetchData={fetchData}
        onPageSizeChange={onPageSizeChange}
        openEditUserModal={openEditUserModal}
        changeUserStatus={changeUserStatus}
        pageSize={pageSize}
      />
      <UserModal isVisible={modals.newUser} onClose={closeNewUserModal} createUser={createUser} />
      <UserModal
        isEdit
        isVisible={modals.editUser}
        onClose={closeEditUserModal}
        updateUser={updateUser}
        user={userInQuestion}
      />
    </ContentWrapper>
  );
};

Users.propTypes = {
  data: array.isRequired,
  user: object.isRequired,
  isLoading: bool.isRequired,
  fetchUsers: func.isRequired,
  createUser: func.isRequired,
  updateUser: func.isRequired,
  push: func.isRequired,
  totalCount: number.isRequired,
};

const mapStateToProps = (state) => ({
  data: selectUsers(state),
  user: state.app.user,
  isLoading: state.users.isLoading,
  totalCount: state.users.totalCount,
});

const mapDispatchToProps = {
  fetchUsers,
  createUser,
  updateUser,
  push,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
