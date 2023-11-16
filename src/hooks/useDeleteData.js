import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useDeleteData = () => {
  const { user } = useAuthContext();

  const deleteData = async (url, param) => {
    try {
      if (!param) throw Error('No parameter delivered');
      setTimeout(async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            userId: user.id,
            username: user.username,
          },
        };
        await axios.delete(url + param, config);
      }, 400);
    } catch (e) {}
  };
  return { deleteData };
};
