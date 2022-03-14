import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import rootReducer from './reducers';
//import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState?: any) {
  return createStore(rootReducer, initialState);
}
