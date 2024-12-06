import { useContext } from 'react';
import { AuthContext, AuthContextValues } from '../contexts/AuthContext';

export const useAuth = (): AuthContextValues => {
  const context = useContext<AuthContextValues>(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
