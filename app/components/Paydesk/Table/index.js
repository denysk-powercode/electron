import React from 'react';
import { func, bool, array, number } from 'prop-types';
import columns from './columns';

import Table from '../../common/Table';

const PaydeskOperationsTable = ({ data, pages, isLoading, fetchData, pageSize, onPageSizeChange }) => {
  return (
    <Table
      columns={columns}
      isLoading={isLoading}
      data={data}
      fetchData={fetchData}
      onPageSizeChange={onPageSizeChange}
      pages={pages}
      pageSize={pageSize}
      defaultSorted={[{ id: 'created_at', desc: true }]}
    />
  );
};

PaydeskOperationsTable.propTypes = {
  data: array.isRequired,
  pages: number.isRequired,
  isLoading: bool.isRequired,
  pageSize: number.isRequired,
  fetchData: func.isRequired,
  onPageSizeChange: func.isRequired,
};

export default PaydeskOperationsTable;
