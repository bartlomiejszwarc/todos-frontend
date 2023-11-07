import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useTasksContext } from './useTasksContext';

import axios from 'axios';

export const useCreateTask = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const { dispatch, tab } = useTasksContext();

  const createTask = async (title, description, priority = 4, deadline = undefined) => {
    try {
      const body = {
        text: title,
        description: description,
        owner: user?.id,
        deadline: deadline,
        priority: priority,
      };
      const res = await axios.post(process.env.REACT_APP_API_TASKS_CREATE, body);
      setError(null);
      dispatch({ type: 'ADD_TASK', payload: res?.data?.task });
      return res;
    } catch (e) {}
  };
  return { createTask, error };
};
