import React from 'react';
import { Provider } from 'react-redux';
import propTypes from 'prop-types';
import { ConnectedRouter as Router } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorBoundary from './components/common/ErrorBoundary';
import IntlProvider from './i18n/IntlProvider';
import Main from './screens/app';
// needed for importing global styles from external libraries (like react-table)
// haven't found better solution yet, it won't compile if i try to import css file directly
import './app.global.css';

const App = ({ store, history, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <IntlProvider>
          <ErrorBoundary>
            <Main />
          </ErrorBoundary>
        </IntlProvider>
      </Router>
    </PersistGate>
  </Provider>
);

App.propTypes = {
  store: propTypes.object.isRequired,
  history: propTypes.object.isRequired,
  persistor: propTypes.object.isRequired,
};

export default App;
