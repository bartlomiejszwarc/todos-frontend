import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const usePostData = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const postData = async (postUrl, body) => {
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
      const res = await axios.post(postUrl, body, config);
      setData(res.data);
      return res;
    } catch (e) {
      setError(e);
    }
  };
  return { postData, data, error };
};
