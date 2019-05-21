import React from 'react';
import { Button, Input, Icon, Popup } from 'semantic-ui-react';
import styled from 'styled-components';

const materialsColumns = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Title',
    accessor: 'title',
  },
  {
    Header: 'Price per kg',
    /* eslint-disable-next-line react/prop-types */
    Filter: ({ filter, onChange }) => {
      return (
        <InputsWrapper>
          <StyledInput placeholder="From" onChange={(e) => onChange({ from: e.target.value, to: filter?.value?.to })} />
          <StyledInput placeholder="To" onChange={(e) => onChange({ from: filter?.value?.from, to: e.target.value })} />
        </InputsWrapper>
      );
    },
    accessor: 'price',
  },
  {
    Header: 'Info',
    accessor: 'additional_info',
    sortable: false,
    filterable: false,
    Cell: (row) => <Popup hoverable trigger={<Icon name="info" size="large" />} content={row.value} />,
  },
  {
    Header: 'Controls',
    accessor: '',
    sortable: false,
    filterable: false,
    Cell: (props) => (
      <>
        <Button
          /* eslint-disable-next-line react/prop-types */
          onClick={() => props.tdProps.rest.actions.openEditMaterialModal(props.original)}
          icon={<Icon name="edit" />}
        />
        <Button
          /* eslint-disable-next-line react/prop-types */
          onClick={() => props.tdProps.rest.actions.openDeleteMaterialModal(props.original)}
          icon={<Icon name="remove" />}
        />
      </>
    ),
  },
];

const InputsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledInput = styled(Input)`
  width: 45%;
`;

export default materialsColumns;
