import { createContext, useReducer } from 'react';
export const PostsContext = createContext();

export const postsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    default:
      return state;
  }
};

export const PostsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, {
    posts: [],
  });

  return <PostsContext.Provider value={{ ...state, dispatch }}>{children} </PostsContext.Provider>;
};
