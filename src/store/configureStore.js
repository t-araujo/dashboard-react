import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';

import promise from 'redux-promise';
import ReduxThunk from 'redux-thunk';

const middlewares = [
  promise,
  ReduxThunk,
];

const createStoreWithMiddleware = applyMiddleware(
  ...middlewares
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}
