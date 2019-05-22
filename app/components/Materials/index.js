import React, { useState, useCallback } from 'react';
import { array, bool, func, number, object } from 'prop-types';
import { connect } from 'react-redux';
import ContentWrapper from '../common/ContentWrapper';
import { fetchMaterials, createMaterial, updateMaterial, importCSV } from '../../store/materials/actions';
import { selectMaterials } from '../../store/materials/selectors';
import { useModals } from '../../hooks/useModals';

import MaterialsTable from './Table';
import MaterialModal from './Modal';
import TableActions from './Actions';

const Materials = ({
  data,
  isLoading,
  fetchMaterials,
  createMaterial,
  updateMaterial,
  importCSV,
  user,
  totalCount,
}) => {
  // state
  const [pageSize, setPageSize] = useState(10);
  const [materialInQuestion, setMaterialInQuestion] = useState(null);
  const [modals, dispatch] = useModals('newMaterial', 'editMaterial');

  // modals
  const openNewMaterialModal = useCallback(() => dispatch({ type: 'OPEN', name: 'newMaterial' }));
  const closeNewMaterialModal = useCallback(() => dispatch({ type: 'CLOSE', name: 'newMaterial' }));
  const openEditMaterialModal = useCallback((material) => {
    setMaterialInQuestion(material);
    dispatch({ type: 'OPEN', name: 'editMaterial' });
  });
  const closeEditMaterialModal = useCallback(() => dispatch({ type: 'CLOSE', name: 'editMaterial' }));
  // callbacks
  const fetchData = (state) =>
    fetchMaterials(state.page * state.pageSize, state.pageSize, state.sorted[0], state.filtered);
  const onPageSizeChange = useCallback((pageSize) => setPageSize(pageSize));

  return (
    <ContentWrapper
      title="Materials"
      actions={!user.role ? <TableActions openNewMaterialModal={openNewMaterialModal} importCSV={importCSV} /> : null}
    >
      <MaterialsTable
        data={data}
        pages={Math.ceil(totalCount / pageSize)}
        isLoading={isLoading}
        fetchData={fetchData}
        onPageSizeChange={onPageSizeChange}
        openEditMaterialModal={openEditMaterialModal}
        pageSize={pageSize}
        isAdmin={!user.role}
      />
      <MaterialModal onClose={closeNewMaterialModal} isVisible={modals.newMaterial} createMaterial={createMaterial} />
      <MaterialModal
        material={materialInQuestion}
        isEdit
        onClose={closeEditMaterialModal}
        isVisible={modals.editMaterial}
        updateMaterial={updateMaterial}
      />
    </ContentWrapper>
  );
};

Materials.propTypes = {
  data: array.isRequired,
  isLoading: bool.isRequired,
  fetchMaterials: func.isRequired,
  createMaterial: func.isRequired,
  updateMaterial: func.isRequired,
  importCSV: func.isRequired,
  totalCount: number.isRequired,
  user: object.isRequired,
};

const mapStateToProps = (state) => ({
  data: selectMaterials(state),
  isLoading: state.materials.isLoading,
  totalCount: state.materials.totalCount,
  user: state.app.user,
});

const mapDispatchToProps = {
  fetchMaterials,
  createMaterial,
  updateMaterial,
  importCSV,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Materials);
