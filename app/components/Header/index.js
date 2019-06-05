import React, { useCallback } from 'react';
import { func, number } from 'prop-types';
import { connect } from 'react-redux';
import HeaderControls from './Controls';

import { logout } from '../../store/auth/actions';
import { openPaydesk, closePaydesk } from '../../store/paydesk/actions';
import { useModals } from '../../hooks/useModals';
import OpenPaydeskModal from './Paydesk/OpenPaydesk';
import ClosePaydeskModal from './Paydesk/ClosePaydesk';
import AddCashModal from './Paydesk/AddCash';
import WithdrawCashModal from './Paydesk/WithdrawCash';

const Header = ({ logout, openPaydesk, closePaydesk, amount }) => {
  const [modals, dispatch] = useModals('openPaydesk', 'closePaydesk', 'addCash', 'withdrawCash');
  const closeOpenPaydeskModal = useCallback(() => dispatch({ name: 'openPaydesk', type: 'CLOSE' }));
  const closeClosePaydeskModal = useCallback(() => dispatch({ name: 'closePaydesk', type: 'CLOSE' }));
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
  return (
    <>
      <HeaderControls
        logout={logout}
        currentPaydeskAmount={amount}
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
        onClose={useCallback(() => dispatch({ name: 'addCash', type: 'CLOSE' }))}
        currentPaydeskAmount={amount}
      />
      <WithdrawCashModal
        isVisible={modals.withdrawCash}
        onClose={useCallback(() => dispatch({ name: 'withdrawCash', type: 'CLOSE' }))}
        currentPaydeskAmount={amount}
      />
    </>
  );
};

Header.propTypes = {
  logout: func.isRequired,
  openPaydesk: func.isRequired,
  closePaydesk: func.isRequired,
  amount: number.isRequired,
};

const mapDispatchToProps = {
  logout,
  openPaydesk,
  closePaydesk,
};

const mapStateToProps = (state) => ({
  amount: state.paydesk.amount,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
