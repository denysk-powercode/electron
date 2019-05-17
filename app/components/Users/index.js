import React, { useState, useCallback } from 'react';
import { array, bool, func, number } from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import ContentWrapper from '../common/ContentWrapper';
import UsersTable from './Table';
import { fetchUsers, deleteUser, createUser, updateUser } from '../../store/users/actions';
import { selectUsers } from '../../store/users/selectors';
import { useModals } from '../../hooks/useModals';

import UserModal from './UserModal';
import DeleteuserModal from './DeleteModal';

const Users = ({ data, isLoading, fetchUsers, deleteUser, createUser, updateUser, totalCount }) => {
  const [pageSize, setPageSize] = useState(10);
  const [userInQuestion, setUserInQuestion] = useState(null);
  const [modals, dispatch] = useModals('newUser', 'deleteUser', 'editUser');
  const onPageSizeChange = useCallback((pageSize) => setPageSize(pageSize));
  const fetchData = (state) => fetchUsers(state.page * state.pageSize, state.pageSize, state.sorted[0], state.filtered);

  const openNewUserModal = useCallback(() => dispatch({ type: 'OPEN', name: 'newUser' }));
  const closeNewUserModal = useCallback(() => dispatch({ type: 'CLOSE', name: 'newUser' }));

  const openDeleteModal = useCallback((user) => {
    setUserInQuestion(user);
    dispatch({ type: 'OPEN', name: 'deleteUser' });
  });
  const closeDeleteModal = useCallback(() => dispatch({ type: 'CLOSE', name: 'deleteUser' }));

  const openEditUserModal = useCallback((user) => {
    setUserInQuestion(user);
    dispatch({ type: 'OPEN', name: 'editUser' });
  });
  const closeEditUserModal = useCallback(() => dispatch({ type: 'CLOSE', name: 'editUser' }));

  const onDelete = useCallback((id) => {
    deleteUser(id, () => closeDeleteModal());
  });

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
        openDeleteModal={openDeleteModal}
        openEditUserModal={openEditUserModal}
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
      <DeleteuserModal
        isVisible={modals.deleteUser}
        onClose={closeDeleteModal}
        deleteUser={onDelete}
        user={userInQuestion}
      />
    </ContentWrapper>
  );
};

Users.propTypes = {
  data: array.isRequired,
  isLoading: bool.isRequired,
  fetchUsers: func.isRequired,
  deleteUser: func.isRequired,
  createUser: func.isRequired,
  updateUser: func.isRequired,
  totalCount: number.isRequired,
};

const mapStateToProps = (state) => ({
  data: selectUsers(state),
  isLoading: state.users.isLoading,
  totalCount: state.users.totalCount,
});

const mapDispatchToProps = {
  fetchUsers,
  deleteUser,
  createUser,
  updateUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
