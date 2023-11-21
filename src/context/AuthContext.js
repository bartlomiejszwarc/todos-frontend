import { createContext, useReducer, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    case 'UPDATE_USER_DETAILS':
      return { ...state, userInfo: { ...state.userInfo, ...action.payload } };
    default:
      return state;
  }
};

const checkAuth = async (fetchUrl) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      throw Error('User not found.');
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      params: {
        userId: user.id,
      },
    };
    const response = await axios.get(fetchUrl, config);

    return { isAuth: true, response: response };
  } catch (e) {
    return false;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, userInfo: null });
  const [isAuth, setIsAuth] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const auth = await checkAuth(process.env.REACT_APP_API_CHECK_AUTH);
        setIsAuth(auth.isAuth);
        dispatch({ type: 'UPDATE_USER_DETAILS', payload: auth.response.data.user });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    checkAuthentication();
  }, [state.user]);

  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (isAuth && !isLoading) {
      dispatch({ type: 'LOGIN', payload: user });
      navigate('dashboard');
    }
    if (!isAuth && !isLoading) {
      dispatch({ type: 'LOGOUT', payload: null });
      navigate('/');
    }
    if (!user) {
      dispatch({ type: 'LOGOUT', payload: null });
      navigate('/');
    }
  }, [isAuth]);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
