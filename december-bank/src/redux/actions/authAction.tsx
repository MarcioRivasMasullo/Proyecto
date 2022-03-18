import { AuthData } from '../reducers/authReducer';

export function storeAuthData(data: AuthData) {
  return { type: STORE_AUTH_DATA, data };
}

export const STORE_AUTH_DATA = 'STORE_AUTH_DATA';
