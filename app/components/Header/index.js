import React, { useCallback, useEffect } from 'react';
import { func, number, bool } from 'prop-types';
import { connect } from 'react-redux';
import HeaderControls from './Controls';

import { logout } from '../../store/auth/actions';
import { openPaydesk, closePaydesk, checkPaydeskState, addCash, withdrawCash } from '../../store/paydesk/actions';
import { useModals } from '../../hooks/useModals';
import OpenPaydeskModal from './Paydesk/OpenPaydesk';
import ClosePaydeskModal from './Paydesk/ClosePaydesk';
import AddCashModal from './Paydesk/AddCash';
import WithdrawCashModal from './Paydesk/WithdrawCash';

const Header = ({ logout, openPaydesk, closePaydesk, amount, checkPaydeskState, isOpen, addCash, withdrawCash }) => {
  useEffect(() => {
    checkPaydeskState();
  }, []);
  const [modals, dispatch] = useModals('openPaydesk', 'closePaydesk', 'addCash', 'withdrawCash');
  const closeOpenPaydeskModal = useCallback(() => dispatch({ name: 'openPaydesk', type: 'CLOSE' }));
  const closeClosePaydeskModal = useCallback(() => dispatch({ name: 'closePaydesk', type: 'CLOSE' }));
  const closeAddCashModal = useCallback(() => dispatch({ name: 'addCash', type: 'CLOSE' }));
  const closeWithdrawCashModal = useCallback(() => dispatch({ name: 'withdrawCash', type: 'CLOSE' }));
  const onOpenPaydesk = useCallback((amount) => {
    openPaydesk(amount, (e) => {
      if (!e) closeOpenPaydeskModal();
    });
  });
  const onClosePaydesk = useCallback(() => {
    closePaydesk(amount, (e) => {
      if (!e) closeClosePaydeskModal();
    });
  });
  const onAddCash = useCallback((data) => {
    addCash(data, (e) => {
      if (!e) closeAddCashModal();
    });
  });
  const onWithdrawCash = useCallback((data) => {
    withdrawCash(data, (e) => {
      if (!e) closeWithdrawCashModal(data);
    });
  });
  return (
    <>
      <HeaderControls
        logout={logout}
        currentPaydeskAmount={amount}
        isOpen={isOpen}
        openPaydesk={useCallback(() => dispatch({ name: 'openPaydesk', type: 'OPEN' }))}
        closePaydesk={useCallback(() => dispatch({ name: 'closePaydesk', type: 'OPEN' }))}
        addCash={useCallback(() => dispatch({ name: 'addCash', type: 'OPEN' }))}
        withdrawCash={useCallback(() => dispatch({ name: 'withdrawCash', type: 'OPEN' }))}
      />
      <OpenPaydeskModal isVisible={modals.openPaydesk} onClose={closeOpenPaydeskModal} onOpenPaydesk={onOpenPaydesk} />
      <ClosePaydeskModal
        isVisible={modals.closePaydesk}
        onClose={closeClosePaydeskModal}
        closePaydesk={onClosePaydesk}
        currentPaydeskAmount={amount}
      />
      <AddCashModal
        isVisible={modals.addCash}
        onClose={closeAddCashModal}
        currentPaydeskAmount={amount}
        onAddCash={onAddCash}
      />
      <WithdrawCashModal
        isVisible={modals.withdrawCash}
        onClose={closeWithdrawCashModal}
        currentPaydeskAmount={amount}
        onWithdrawCash={onWithdrawCash}
      />
    </>
  );
};

Header.propTypes = {
  logout: func.isRequired,
  openPaydesk: func.isRequired,
  checkPaydeskState: func.isRequired,
  closePaydesk: func.isRequired,
  addCash: func.isRequired,
  withdrawCash: func.isRequired,
  amount: number.isRequired,
  isOpen: bool.isRequired,
};

const mapDispatchToProps = {
  logout,
  openPaydesk,
  closePaydesk,
  checkPaydeskState,
  addCash,
  withdrawCash,
};

const mapStateToProps = (state) => ({
  amount: state.paydesk.amount,
  isOpen: state.paydesk.isOpen,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
