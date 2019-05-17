import React from 'react';
import { func, bool, array, number } from 'prop-types';
import ReactTable from 'react-table';
import { Icon, Popup, Button } from 'semantic-ui-react';

const columns = [
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
    Header: '',
    accessor: 'additional_info',
    sortable: false,
    filterable: false,
    Cell: (props) => (
      <>
        <Button
          onClick={() => props.tdProps.rest.actions.openEditUserModal(props.original)}
          icon={<Icon name="edit" />}
        />
        {Boolean(props.original.role) && (
          <Button
            onClick={() => props.tdProps.rest.actions.openDeleteModal(props.original)}
            icon={<Icon name="user delete" />}
          />
        )}
      </>
    ),
  },
];

const UsersTable = ({
  data,
  pages,
  isLoading,
  fetchData,
  pageSize,
  onPageSizeChange,
  openDeleteModal,
  openEditUserModal,
}) => {
  return (
    <ReactTable
      columns={columns}
      resolveData={(data) => (data.length > pageSize ? data.slice(0, pageSize) : data)} // add new rows at the end
      manual // Forces table not to paginate or sort automatically, so we can handle it server-side
      data={data}
      pages={pages} // Display the total number of pages
      loading={isLoading} // Display the loading overlay when we need it
      onFetchData={fetchData} // Request new data when things change
      defaultPageSize={10}
      pageSize={pageSize}
      onPageSizeChange={onPageSizeChange}
      filterable
      defaultSorted={[{ id: 'id', desc: false }]}
      className="-striped -highlight"
      getTdProps={() => ({
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        actions: {
          openDeleteModal,
          openEditUserModal,
        },
      })}
    />
  );
};

UsersTable.propTypes = {
  data: array.isRequired,
  pages: number.isRequired,
  isLoading: bool.isRequired,
  pageSize: number.isRequired,
  fetchData: func.isRequired,
  onPageSizeChange: func.isRequired,
  openDeleteModal: func.isRequired,
  openEditUserModal: func.isRequired,
};

export default UsersTable;
