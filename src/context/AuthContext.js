import { createContext, useReducer, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const AuthContext = createContext();

export const authRecuder = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

const checkAuth = async (fetchUrl, dispatch) => {
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
    await axios.get(fetchUrl, config);
    return true;
  } catch (e) {
    return false;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authRecuder, { user: null });
  const [isAuth, setIsAuth] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const auth = await checkAuth(process.env.REACT_APP_API_CHECK_AUTH, dispatch);
        setIsAuth(auth);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (isAuth && !isLoading) {
      dispatch({ type: 'LOGIN', payload: user });
      navigate('dashboard');
    }
    if (!isAuth && !isLoading) {
      dispatch({ type: 'LOGOUT', payload: user });
      navigate('/');
    }
  }, [isAuth]);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
