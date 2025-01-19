import { useContext } from 'react';
import { AlertContext, AlertContextValues } from '../contexts/AlertContext';

export const useAlert = (): AlertContextValues => {
  const context = useContext<AlertContextValues>(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
}
