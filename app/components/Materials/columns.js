import React from 'react';
import { Button, Checkbox, Icon, Popup } from 'semantic-ui-react';

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
          onClick={() => props.tdProps.rest.actions.openEditUserModal(props.original)}
          icon={<Icon name="edit" />}
        />
        <Button
          /* eslint-disable-next-line react/prop-types */
          onClick={() => props.tdProps.rest.actions.deleteUserModal(props.original)}
          icon={<Icon name="remove" />}
        />
      </>
    ),
  },
];

export default materialsColumns;
