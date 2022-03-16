export interface AuthData {
  userSessionToken: string;
  userName: string;
  id: number;
}

export interface AuthActionType {
  type: string;
  data: AuthData;
}

export default function authReducer(
  state: AuthData = { userSessionToken: '', userName: '', id: 0 },
  action: AuthActionType
): AuthData {
  switch (action.type) {
    case 'STORE_AUTH_DATA':
      return {
        ...state,
        userSessionToken: action.data.userSessionToken,
        userName: action.data.userName,
      };
    default:
      return state;
  }
}
