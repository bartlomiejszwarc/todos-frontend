import { createContext, useReducer, useEffect } from 'react';
import TasksPage from '../pages/Tasks/TasksPage';
import { useTasksContext } from '../hooks/useTasksContext';
import FriendsSearchPage from '../pages/Friends/FriendsSearchPage';
import FriendsRequestsPage from '../pages/Friends/Requests/FriendsRequestsPage';
export const DashboardContentContext = createContext();

export const dashboardContentReducer = (state, action) => {
  switch (action.type) {
    case 'TASKS':
      return { content: <TasksPage title={action.payload.tab} /> };
    case 'SEARCH_USERS':
      return { content: <FriendsSearchPage title={action.payload.tab} /> };
    case 'INVITATIONS':
      return { content: <FriendsRequestsPage title={action.payload.tab} /> };
    default:
      return 'tasks';
  }
};

export const DashboardContentContextProvider = ({ children }) => {
  const { tab } = useTasksContext();
  const [state, dispatch] = useReducer(dashboardContentReducer, {
    content: <TasksPage title={tab} />,
  });

  return <DashboardContentContext.Provider value={{ ...state, dispatch }}>{children}</DashboardContentContext.Provider>;
};
