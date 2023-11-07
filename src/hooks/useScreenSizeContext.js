import { ScreenSizeContext } from '../context/ScreenSizeContext';
import { useContext } from 'react';

export const useScreenSizeContext = () => {
  const context = useContext(ScreenSizeContext);
  if (!context) {
    throw Error('useScreenSizeContext must be used inside an ScreenSizeContextProvider ');
  }
  return context;
};
