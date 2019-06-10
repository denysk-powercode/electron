import React from 'react';
import { func, bool, array, number } from 'prop-types';
import columns from './columns';

import Table from '../../common/Table';

const TransactionsTable = ({
  data,
  pages,
  isLoading,
  fetchData,
  pageSize,
  onPageSizeChange,
  openPrint,
  isAdmin,
  onCancelTransactionClick,
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
      actions={{ openPrint, onCancelTransactionClick, isAdmin }}
    />
  );
};

TransactionsTable.propTypes = {
  data: array.isRequired,
  pages: number.isRequired,
  isLoading: bool.isRequired,
  pageSize: number.isRequired,
  fetchData: func.isRequired,
  onPageSizeChange: func.isRequired,
  onCancelTransactionClick: func.isRequired,
  openPrint: func.isRequired,
  isAdmin: bool.isRequired,
};

export default TransactionsTable;
