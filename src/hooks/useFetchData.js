import { useState } from 'react';
import axios from 'axios';
export const useFetchData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const fetchData = async (fetchUrl, param) => {
    setIsLoading(true);
    try {
      setError(null);
      const res = await axios.get(fetchUrl + param);
      setData(res.data);
      setIsLoading(false);
      return res.data;
    } catch (e) {
      setError(e);
    }
  };
  return { fetchData, data, isLoading, error };
};
