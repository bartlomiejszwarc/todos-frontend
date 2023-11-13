import { useTasksContext } from './useTasksContext';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useDeleteTask = () => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const deleteTask = async (_id) => {
    try {
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
        await axios.delete(process.env.REACT_APP_API_TASKS + _id, config);
        dispatch({ type: 'DELETE_TASK', payload: _id });
      }, 400);
    } catch (e) {}
  };
  return { deleteTask };
};
