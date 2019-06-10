import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { func, bool, object, number, array } from 'prop-types';
import { push } from 'connected-react-router';
import { Button } from 'semantic-ui-react';
import electron from 'electron';
import reactDOMServer from 'react-dom/server';

import TransactionsTable from './Table';
import PrintTable from './PrintTable';
import { selectTransactions } from '../../store/transactions/selectors';
import { fetchTransactions, setActiveTransaction } from '../../store/transactions/actions';
import ContentWrapper from '../common/ContentWrapper';
import routes from '../../constants/routes';

const { BrowserWindow } = electron.remote;
const Transactions = ({
  data,
  isLoading,
  fetchTransactions,
  push,
  user,
  totalCount,
  isPaydeskOpen,
  setActiveTransaction,
}) => {
  const [pageSize, setPageSize] = useState(10);
  const fetchData = (state) =>
    fetchTransactions(state.page * state.pageSize, state.pageSize, state.sorted[0], state.filtered);
  const onPageSizeChange = useCallback((pageSize) => setPageSize(pageSize));
  const navigateToNew = () => push(routes.NEW_TRANSACTION);
  const openPrint = (data) => {
    const win = new BrowserWindow({ show: false, webPreferences: { devTools: false } });
    const html = ['<body>', reactDOMServer.renderToString(<PrintTable data={data} />), '</body>'].join('');
    win.loadURL(`data:text/html;charset=utf-8,${encodeURI(html)}`);
    win.webContents.on('did-finish-load', () => {
      win.webContents.print();
    });
    // contents.print();
  };
  const onCancelTransactionClick = (transaction) => {
    setActiveTransaction(transaction);
    navigateToNew();
  };
  return (
    <ContentWrapper
      title="Transactions"
      actions={<Button primary disabled={!isPaydeskOpen} content="New" onClick={navigateToNew} />}
      // actions={!user.role ? <TableActions openNewMaterialModal={openNewMaterialModal} importCSV={importCSV} /> : null}
    >
      <TransactionsTable
        data={data}
        pages={Math.ceil(totalCount / pageSize)}
        isLoading={isLoading}
        fetchData={fetchData}
        onPageSizeChange={onPageSizeChange}
        pageSize={pageSize}
        isAdmin={!user?.role}
        openPrint={openPrint}
        onCancelTransactionClick={onCancelTransactionClick}
      />
    </ContentWrapper>
  );
};

Transactions.propTypes = {
  data: array.isRequired,
  isLoading: bool.isRequired,
  fetchTransactions: func.isRequired,
  push: func.isRequired,
  totalCount: number.isRequired,
  user: object.isRequired,
  isPaydeskOpen: bool.isRequired,
  setActiveTransaction: func.isRequired,
};

const mapStateToProps = (state) => ({
  data: selectTransactions(state),
  isLoading: state.transactions.isLoading,
  totalCount: state.transactions.totalCount,
  user: state.app.user,
  isPaydeskOpen: state.paydesk.isOpen,
});

const mapDispatchToProps = {
  fetchTransactions,
  setActiveTransaction,
  push,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
