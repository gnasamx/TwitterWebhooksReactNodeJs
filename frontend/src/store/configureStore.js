import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import DevTools from './DevTools';
import rootReducer from '../reducers';

const logger = createLogger();

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    DevTools.instrument(),
  ),
);
