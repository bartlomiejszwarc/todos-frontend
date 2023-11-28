import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const register = async (username, displayName, password) => {
    setIsLoading(true);
    setError(null);

    const headers = {
      'Content-Type': 'application/json',
    };
    const body = {
      username: username,
      displayName: displayName,
      password: password,
    };

    const res = await axios.post(process.env.REACT_APP_API_AUTH_REGISTER, body, {
      headers: headers,
    });
    if (res?.data?.status === 400) {
      setError(res?.data?.error);
    }

    if (res?.data?.status === 200) {
      setError(null);
      setIsLoading(false);
      navigate('/');
    }
  };
  return { register, isLoading, error };
};
