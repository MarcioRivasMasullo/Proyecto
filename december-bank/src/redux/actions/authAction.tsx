import { AuthData } from '../reducers/authReducer';

export function storeAuthData(data: AuthData) {
  return { type: 'STORE_AUTH_DATA', data };
}
