import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import createHistory from './history';
import app from './app/reducer';
import auth from './auth/reducer';
import users from './users/reducer';
import materials from './materials/reducer';

const history = createHistory();

const rootReducer = combineReducers({
  app,
  auth,
  users,
  materials,
  router: connectRouter(history),
});

export default rootReducer;
