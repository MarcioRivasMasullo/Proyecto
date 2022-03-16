import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import transactionReducer from './transactionReducer';

const rootReducer = combineReducers({
  transactionReducer,
  authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
