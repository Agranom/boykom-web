import { createContext } from 'react';

export type AuthContextValues = {
  isSignedIn: boolean;
  accessToken?: string;
}

export const AuthContext = createContext<AuthContextValues>({
  isSignedIn: false,
  accessToken: undefined,
});
