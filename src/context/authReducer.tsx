import {Usuario} from '../interfaces/appInterfaces';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'non-authenticated';
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
}

type AuthAction =
  | {type: 'signUp'; payload: {token: string; user: Usuario}}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'notAuthenticated'}
  | {type: 'logOut'};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        user: null,
        status: 'non-authenticated',
        token: null,
        errorMessage: action.payload,
      };

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };

    case 'signUp':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        status: 'authenticated',
        errorMessage: '',
      };

    case 'logOut':
      return {
        ...state,
        user: null,
        token: null,
        status: 'non-authenticated',
      };

    case 'notAuthenticated':
      return {
        ...state,
        user: null,
        token: null,
        status: 'non-authenticated',
      };

    default:
      return state;
  }
};
