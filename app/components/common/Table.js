import React from 'react';
import { func, bool, array, number, object } from 'prop-types';
import ReactTable from 'react-table';

const Table = ({ data, pages, isLoading, fetchData, pageSize, onPageSizeChange, actions, columns }) => {
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
        actions,
      })}
    />
  );
};

Table.propTypes = {
  data: array.isRequired,
  pages: number.isRequired,
  isLoading: bool.isRequired,
  pageSize: number.isRequired,
  fetchData: func.isRequired,
  onPageSizeChange: func.isRequired,
  actions: object,
  columns: array.isRequired,
};

Table.defaultProps = {
  actions: {},
};

export default Table;
