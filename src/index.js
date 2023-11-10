import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import { TasksContextProvider } from './context/TasksContext';
import { DashboardContentContextProvider } from './context/DashboardContentContext';
import { ScreenSizeContextProvider } from './context/ScreenSizeContext';
import { FriendsContextProvider } from './context/FriendsContext';
import { PostsContextProvider } from './context/PostsContext';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ScreenSizeContextProvider>
        <FriendsContextProvider>
          <PostsContextProvider>
            <TasksContextProvider>
              <DashboardContentContextProvider>
                <App />
              </DashboardContentContextProvider>
            </TasksContextProvider>
          </PostsContextProvider>
        </FriendsContextProvider>
      </ScreenSizeContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
);
reportWebVitals();
