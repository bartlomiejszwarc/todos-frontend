import { useState } from 'react';
import axios from 'axios';

export const usePutData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const putData = async (postUrl, body) => {
    setError(null);
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const res = await axios.put(postUrl, body, { headers: headers });
      setData(res.data);
    } catch (e) {
      setError(e);
    }
  };
  return { putData, data, error };
};
