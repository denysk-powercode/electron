import React, { useRef } from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import { Button, Icon } from 'semantic-ui-react';

const TableActions = ({ openNewMaterialModal, importCSV }) => {
  const input = useRef(null);
  const onImportClick = () => input.current.click();
  const onFileInputChange = (e) => {
    importCSV(e.target.files[0]);
    input.current.value = '';
  };
  return (
    <Container>
      <InvisibleInput type="file" ref={input} accept=".csv" onChange={onFileInputChange} />
      <Button animated="fade" type="file" onClick={onImportClick}>
        <Button.Content visible>Import CSV</Button.Content>
        <Button.Content hidden>
          <Icon name="download" />
        </Button.Content>
      </Button>
      <RightButton onClick={openNewMaterialModal} primary>
        New
      </RightButton>
    </Container>
  );
};

TableActions.propTypes = {
  openNewMaterialModal: func.isRequired,
  importCSV: func.isRequired,
};

const Container = styled.div`
  display: flex;
`;

const RightButton = styled(Button)`
  &&& {
    margin-left: 20px;
  }
`;

const InvisibleInput = styled.input`
  display: none;
`;

export default TableActions;
