import React from 'react';
import { Button, Checkbox, Icon, Popup } from 'semantic-ui-react';

const userColumns = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'First Name',
    accessor: 'first_name',
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
  },
  {
    Header: 'Login',
    accessor: 'login',
  },
  {
    Header: 'Info',
    accessor: 'additional_info',
    sortable: false,
    filterable: false,
    Cell: (row) => <Popup hoverable trigger={<Icon name="info" size="large" />} content={row.value} />,
  },
  {
    Header: 'Status',
    accessor: 'is_active',
    filterable: false,
    /* eslint-disable-next-line react/prop-types */
    Cell: ({ original, tdProps }) => (
      <Checkbox
        toggle
        checked={original.is_active}
        onChange={(e, data) => tdProps.rest.actions.changeUserStatus(original.id, data.checked)}
      />
    ),
  },
  {
    Header: '',
    accessor: '',
    sortable: false,
    filterable: false,
    Cell: (props) => (
      <Button
        /* eslint-disable-next-line react/prop-types */
        onClick={() => props.tdProps.rest.actions.openEditUserModal(props.original)}
        icon={<Icon name="edit" />}
      />
    ),
  },
];

export default userColumns;
