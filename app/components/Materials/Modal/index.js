import React from 'react';
import { func, bool, object } from 'prop-types';

import MaterialForm from './Form';
import Modal from '../../common/Modal';

const MaterialModal = ({ isVisible, onClose, createMaterial, updateMaterial, isEdit, material }) => (
  <Modal isVisible={isVisible} onClose={onClose} title={isEdit ? 'Edit Material' : 'Create Material'}>
    <MaterialForm
      onClose={onClose}
      createMaterial={createMaterial}
      updateMaterial={updateMaterial}
      isEdit={isEdit}
      material={material}
    />
  </Modal>
);

MaterialModal.propTypes = {
  isVisible: bool.isRequired,
  onClose: func.isRequired,
  createMaterial: func,
  updateMaterial: func,
  isEdit: bool,
  material: object,
};

MaterialModal.defaultProps = {
  createMaterial: undefined,
  updateMaterial: undefined,
  isEdit: false,
  material: null,
};

export default MaterialModal;
