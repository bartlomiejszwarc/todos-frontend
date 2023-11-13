// import { useState } from 'react';
// import axios from 'axios';
// import { useAuthContext } from '../hooks/useAuthContext';
// export const useFetchData = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(null);
//   const { user } = useAuthContext();
//   const fetchData = async (fetchUrl, param) => {
//     setIsLoading(true);

//     try {
//       setError(null);
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//         params: {
//           userId: user.id,
//           username: user.username,
//         },
//       };
//       const res = await axios.get(fetchUrl + param, config);
//       setData(res.data);
//       setIsLoading(false);
//       return res.data;
//     } catch (e) {
//       setError(e);
//     }
//   };
//   return { fetchData, data, isLoading, error };
// };

import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

export const useFetchData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();

  const fetchData = async (fetchUrl, param) => {
    setIsLoading(true);

    try {
      setError(null);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          userId: user.id,
        },
      };

      const res = await axios.get(fetchUrl + param, config);
      setData(res.data);
      setIsLoading(false);
      return res.data;
    } catch (e) {
      setError(e);
    }
  };

  return { fetchData, data, isLoading, error };
};
