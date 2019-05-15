import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { routerMiddleware } from 'connected-react-router';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { createHashHistory } from 'history';
import { configureStore } from './store';
import App from './App';

const browserHistory = createHashHistory();
const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

const { store, persistor } = configureStore({ middleware: [routerMiddleware(browserHistory)] });

render(
  <AppContainer>
    <App store={store} history={browserHistory} persistor={persistor} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = App;
    render(
      <AppContainer>
        <NextApp store={store} history={browserHistory} persistor={persistor} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
