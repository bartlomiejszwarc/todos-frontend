import { DashboardContentContext } from '../context/DashboardContentContext';
import { useContext } from 'react';

export const useDashboardContentContext = () => {
  const context = useContext(DashboardContentContext);
  if (!context) {
    throw Error('useDashboardContentContext must be used inside an DashboardContentContextProvider');
  }
  return context;
};
