import React, { useMemo } from 'react';
import { func, bool, array, number } from 'prop-types';
import generateColumns from './columns';

import Table from '../../common/Table';

const MaterialsTable = ({
  data,
  pages,
  isLoading,
  fetchData,
  pageSize,
  onPageSizeChange,
  isAdmin,
  openEditMaterialModal,
}) => {
  const columns = useMemo(() => generateColumns(isAdmin), [isAdmin]);
  return (
    <Table
      columns={columns}
      isLoading={isLoading}
      data={data}
      fetchData={fetchData}
      onPageSizeChange={onPageSizeChange}
      pages={pages}
      pageSize={pageSize}
      actions={{ isAdmin, openEditMaterialModal }}
    />
  );
};

MaterialsTable.propTypes = {
  data: array.isRequired,
  pages: number.isRequired,
  isLoading: bool.isRequired,
  pageSize: number.isRequired,
  fetchData: func.isRequired,
  onPageSizeChange: func.isRequired,
  openEditMaterialModal: func.isRequired,
  isAdmin: bool.isRequired,
};

export default MaterialsTable;
