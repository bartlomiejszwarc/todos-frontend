import { useTasksContext } from './useTasksContext';
import axios from 'axios';

export const useDeleteTask = () => {
  const { dispatch } = useTasksContext();

  const deleteTask = async (_id) => {
    try {
      setTimeout(async () => {
        await axios.delete(process.env.REACT_APP_API_TASKS + _id);
        dispatch({ type: 'DELETE_TASK', payload: _id });
      }, 400);
    } catch (e) {}
  };
  return { deleteTask };
};
