/* eslint-disable global-require */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['users'],
};

export const configureStore = ({ initialState = {}, middleware = [] } = {}) => {
  const sagaMiddleware = createSagaMiddleware({
    onError: (error, errorInfo) => {
      console.log('---------ERROR IN REDUX SAGA-----------');
      console.log(error);
      console.log(errorInfo);
    },
  });
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const devtools =
    typeof window !== 'undefined' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsBlacklist: [],
      actionSanitizer: (action) => ({
        ...action,
        type: action.type.toString(),
      }),
    });

  const composeEnhancers = devtools || compose;
  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...[sagaMiddleware, ...middleware]))
  );
  const persistor = persistStore(store);
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => store.replaceReducer(require('./rootReducer').default));
    }
  }
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};

export default configureStore;
