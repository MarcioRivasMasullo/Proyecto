import { combineReducers } from '@reduxjs/toolkit';
import transactionReducer from './transactionReducer';

const rootReducer = combineReducers({
  transactionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
