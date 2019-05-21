import React, { useState, useCallback } from 'react';
import { array, bool, func, number } from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import ContentWrapper from '../common/ContentWrapper';
import MaterialsTable from './Table';
import { fetchMaterials, createMaterial, updateMaterial, deleteMaterial } from '../../store/materials/actions';
import { selectMaterials } from '../../store/materials/selectors';
import { useModals } from '../../hooks/useModals';

import MaterialModal from './Modal';
import DeleteModal from './DeleteModal';

const Users = ({ data, isLoading, fetchMaterials, createMaterial, updateMaterial, deleteMaterial, totalCount }) => {
  // state
  const [pageSize, setPageSize] = useState(10);
  const [materialInQuestion, setMaterialInQuestion] = useState(null);
  const [modals, dispatch] = useModals('newMaterial', 'editMaterial', 'deleteMaterial');

  // modals
  const openNewMaterialModal = useCallback(() => dispatch({ type: 'OPEN', name: 'newMaterial' }));
  const closeNewMaterialModal = useCallback(() => dispatch({ type: 'CLOSE', name: 'newMaterial' }));
  const openEditMaterialModal = useCallback((user) => {
    setMaterialInQuestion(user);
    dispatch({ type: 'OPEN', name: 'editMaterial' });
  });
  const closeEditMaterialModal = useCallback(() => dispatch({ type: 'CLOSE', name: 'editMaterial' }));
  const openDeleteMaterialModal = useCallback((material) => {
    setMaterialInQuestion(material);
    dispatch({ type: 'OPEN', name: 'deleteMaterial' });
  });
  const closeDeleteMaterialModal = useCallback(() => {
    dispatch({ type: 'CLOSE', name: 'deleteMaterial' });
  });
  const onDelete = useCallback((id) => {
    deleteMaterial(id, () => {
      closeDeleteMaterialModal();
    });
  });

  // callbacks
  const fetchData = (state) =>
    fetchMaterials(state.page * state.pageSize, state.pageSize, state.sorted[0], state.filtered);
  const onPageSizeChange = useCallback((pageSize) => setPageSize(pageSize));

  return (
    <ContentWrapper
      title="Materials"
      actions={
        <Button onClick={openNewMaterialModal} primary>
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
        openEditMaterialModal={openEditMaterialModal}
        openDeleteMaterialModal={openDeleteMaterialModal}
        pageSize={pageSize}
      />
      <MaterialModal onClose={closeNewMaterialModal} isVisible={modals.newMaterial} createMaterial={createMaterial} />
      <MaterialModal
        material={materialInQuestion}
        isEdit
        onClose={closeEditMaterialModal}
        isVisible={modals.editMaterial}
        updateMaterial={updateMaterial}
      />
      <DeleteModal
        isVisible={modals.deleteMaterial}
        onClose={closeDeleteMaterialModal}
        material={materialInQuestion}
        deleteMaterial={onDelete}
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
  deleteMaterial: func.isRequired,
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
  deleteMaterial,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
