import React from 'react';
import { func, bool, array, number } from 'prop-types';
import columns from './columns';

import Table from '../../common/Table';

const UsersTable = ({
  data,
  pages,
  isLoading,
  fetchData,
  pageSize,
  onPageSizeChange,
  openEditUserModal,
  changeUserStatus,
}) => {
  return (
    <Table
      columns={columns}
      isLoading={isLoading}
      data={data}
      fetchData={fetchData}
      onPageSizeChange={onPageSizeChange}
      pages={pages}
      pageSize={pageSize}
      actions={{ openEditUserModal, changeUserStatus }}
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
  openEditUserModal: func.isRequired,
  changeUserStatus: func.isRequired,
};

export default UsersTable;
