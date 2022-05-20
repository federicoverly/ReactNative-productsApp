import React, {createContext} from 'react';
import {Usuario} from '../interfaces/appInterfaces';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'non-authenticated';
  singUp: () => void;
  signIn: () => void;
  logOut: () => void;
  removeError: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  return (
    <AuthContext.Provider
      value={
        (errorMessage, token, user, status, signUp, signIn, logOut, removeError)
      }>
      {children}
    </AuthContext.Provider>
  );
};
