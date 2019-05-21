/* eslint-disable camelcase */
import React from 'react';
import { func, bool, object } from 'prop-types';
import { Button } from 'semantic-ui-react';

import styled from 'styled-components';
import Modal from '../../common/Modal';

const DeleteMaterialModal = ({ isVisible, onClose, material, deleteMaterial }) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Delete material">
      <span>Are you sure you want to delete {material?.title}?</span>
      <ButtonsBlock>
        <Button primary onClick={() => deleteMaterial(material.id)}>
          Delete
        </Button>
        <Button onClick={onClose}>No</Button>
      </ButtonsBlock>
    </Modal>
  );
};

DeleteMaterialModal.propTypes = {
  isVisible: bool.isRequired,
  onClose: func.isRequired,
  deleteMaterial: func.isRequired,
  material: object,
};

DeleteMaterialModal.defaultProps = {
  material: null,
};

const ButtonsBlock = styled.div`
  display: flex;
  align-self: flex-end;
  margin-top: 20px;
  width: 20%;
  justify-content: space-between;
`;

export default DeleteMaterialModal;
