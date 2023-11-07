import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const headers = {
      'Content-Type': 'application/json',
    };
    const body = {
      username: username,
      password: password,
    };

    try {
      const res = await axios.post(process.env.REACT_APP_API_AUTH_LOGIN, body, {
        headers: headers,
      });
      localStorage.setItem('user', JSON.stringify(res?.data));
      dispatch({ type: 'LOGIN', payload: res?.data });
      setIsLoading(false);
      navigate('/dashboard');
    } catch (e) {
      setError(e.response.data.message);
    }
  };
  return { login, isLoading, error };
};
