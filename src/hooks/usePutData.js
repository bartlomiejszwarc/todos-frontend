import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const usePutData = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const putData = async (postUrl, body) => {
    setError(null);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      params: {
        userId: user.id,
        username: user.username,
      },
    };
    try {
      const res = await axios.put(postUrl, body, config);
      setData(res.data);
    } catch (e) {
      setError(e);
    }
  };
  return { putData, data, error };
};
