import { createContext, useReducer } from 'react';
export const TasksContext = createContext();

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload], tab: state.tab };
    case 'DELETE_TASK':
      return { tasks: state.tasks.filter((task) => task._id !== action.payload), tab: state.tab };
    case 'SET_TAB':
      return { ...state, tab: action.payload.tab, contentType: action.payload.contentType };
    default:
      return state;
  }
};

export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: null,
    tab: 'Inbox',
    contentType: 'task',
  });

  return <TasksContext.Provider value={{ ...state, dispatch }}>{children}</TasksContext.Provider>;
};
