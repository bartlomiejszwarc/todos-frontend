import { createContext, useReducer } from 'react';

export const ScreenSizeContext = createContext();

export const screenSizeReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_SIDEBAR':
      return { showSidebar: action.payload };
  }
};

export const ScreenSizeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(screenSizeReducer, {
    showSidebar: null,
  });

  return <ScreenSizeContext.Provider value={{ ...state, dispatch }}>{children}</ScreenSizeContext.Provider>;
};
