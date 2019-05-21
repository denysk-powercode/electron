import React, { useState, useCallback } from 'react';
import { array, bool, func, number } from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import ContentWrapper from '../common/ContentWrapper';
import MaterialsTable from './Table';
import { fetchMaterials, createMaterial, updateMaterial } from '../../store/materials/actions';
import { selectMaterials } from '../../store/materials/selectors';
import { useModals } from '../../hooks/useModals';

const Users = ({ data, isLoading, fetchMaterials, createMaterial, updateMaterial, totalCount }) => {
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
  const fetchData = (state) =>
    fetchMaterials(state.page * state.pageSize, state.pageSize, state.sorted[0], state.filtered);
  const onPageSizeChange = useCallback((pageSize) => setPageSize(pageSize));
  const changeUserStatus = useCallback((id, newStatus) => updateMaterial({ is_active: newStatus, id }));

  return (
    <ContentWrapper
      title="Users"
      actions={
        <Button onClick={openNewUserModal} primary>
          New
        </Button>
      }
    >
      <MaterialsTable
        data={data}
        pages={Math.ceil(totalCount / pageSize)}
        isLoading={isLoading}
        fetchData={fetchData}
        onPageSizeChange={onPageSizeChange}
        openEditUserModal={openEditUserModal}
        changeUserStatus={changeUserStatus}
        pageSize={pageSize}
      />
    </ContentWrapper>
  );
};

Users.propTypes = {
  data: array.isRequired,
  isLoading: bool.isRequired,
  fetchMaterials: func.isRequired,
  createMaterial: func.isRequired,
  updateMaterial: func.isRequired,
  totalCount: number.isRequired,
};

const mapStateToProps = (state) => ({
  data: selectMaterials(state),
  isLoading: state.materials.isLoading,
  totalCount: state.materials.totalCount,
});

const mapDispatchToProps = {
  fetchMaterials,
  createMaterial,
  updateMaterial,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
