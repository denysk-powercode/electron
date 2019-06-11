import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { func, bool, number, array } from 'prop-types';

import PaydeskOperationsTable from './Table';
import { selectPaydeskOperations } from '../../store/paydesk/selectors';
import { fetchPaydeskOperations } from '../../store/paydesk/actions';
import ContentWrapper from '../common/ContentWrapper';

const PaydeskOperations = ({ data, isLoading, fetchPaydeskOperations, totalCount }) => {
  const [pageSize, setPageSize] = useState(10);
  const fetchData = (state) => {
    console.log('state.sorted', state.sorted);
    fetchPaydeskOperations(state.page * state.pageSize, state.pageSize, state.sorted[0], state.filtered);
  };

  const onPageSizeChange = useCallback((pageSize) => setPageSize(pageSize));
  return (
    <ContentWrapper title="Paydesk">
      <PaydeskOperationsTable
        data={data}
        pages={Math.ceil(totalCount / pageSize)}
        isLoading={isLoading}
        fetchData={fetchData}
        onPageSizeChange={onPageSizeChange}
        pageSize={pageSize}
      />
    </ContentWrapper>
  );
};

PaydeskOperations.propTypes = {
  data: array.isRequired,
  isLoading: bool.isRequired,
  fetchPaydeskOperations: func.isRequired,
  totalCount: number.isRequired,
};

const mapStateToProps = (state) => ({
  data: selectPaydeskOperations(state),
  isLoading: state.paydesk.isLoading,
  totalCount: state.paydesk.totalCount,
  isPaydeskOpen: state.paydesk.isOpen,
});

const mapDispatchToProps = {
  fetchPaydeskOperations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaydeskOperations);
