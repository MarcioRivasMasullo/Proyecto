import { createStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

export default function configureStore(initialState?: any) {
  return createStore(rootReducer, initialState);
}
