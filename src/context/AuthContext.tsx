import React, {createContext, useEffect, useReducer} from 'react';
import coffeeApi from '../api/coffeeApi';
import {LoginData, LoginResponse, Usuario} from '../interfaces/appInterfaces';
import {authReducer, AuthState} from './authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'non-authenticated';
  singUp: () => void;
  signIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

const AuthInitialState: AuthState = {
  status: 'checking',
  token: null,
  errorMessage: '',
  user: null,
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, AuthInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');

    // No token
    if (!token) {
      return dispatch({type: 'notAuthenticated'});
    }

    // Verify token
    const {resp} = await coffeeApi.get('/auth');
    if (resp.status !== '200') {
      return dispatch({type: 'notAuthenticated'});
    }
    dispatch({
      type: 'signUp',
      payload: {
        token: resp.data.token,
        user: resp.data.usuario,
      },
    });
  };

  const signIn = async ({correo, password}: LoginData) => {
    try {
      const resp = await coffeeApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      console.log(resp);
      dispatch({
        type: 'signUp',
        payload: {
          token: resp.data.token,
          user: resp.data.usuario,
        },
      });

      await AsyncStorage.setItem('token', resp.data.token);
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: 'addError',
        payload:
          error.response.data.msg || 'There is an error, please try again',
      });
    }
  };
  const singUp = () => {};
  const logOut = () => {};
  const removeError = () => {
    dispatch({
      type: 'removeError',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        singUp,
        signIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
