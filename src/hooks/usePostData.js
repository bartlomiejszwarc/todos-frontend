import { useState } from 'react';
import axios from 'axios';

export const usePostData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const postData = async (postUrl, body) => {
    setError(null);
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const res = await axios.post(postUrl, body, { headers: headers });
      setData(res.data);
    } catch (e) {
      setError(e);
    }
  };
  return { postData, data, error };
};
