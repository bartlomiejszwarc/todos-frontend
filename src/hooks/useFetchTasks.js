import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { useTasksContext } from './useTasksContext';
import axios from 'axios';

export const useFetchTasks = () => {
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = useTasksContext();

  useEffect(() => {
    if (user?.id) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    setIsLoading(true);
    const res = await axios.get(process.env.REACT_APP_API_TASKS + user?.id);
    if (res?.status === 200) {
      setIsLoading(false);
      setTasks(res?.data?.tasks);
      dispatch({ type: 'SET_TASKS', payload: res?.data?.tasks });
    }
    if (res?.status === 400) {
    }
  };
  return { tasks, isLoading };
};
