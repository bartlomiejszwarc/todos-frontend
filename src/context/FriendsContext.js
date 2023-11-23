import { createContext, useReducer, useEffect } from 'react';
export const FriendsContext = createContext();

export const friendsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FRIENDS':
      return { ...state, friends: action.payload };
    case 'SET_INCOMING_INVITATIONS':
      return { ...state, incoming: action.payload };
    case 'ADD_TO_FRIENDS_LIST':
      return { ...state, friends: [...state.friends, action.payload] };
    case 'REMOVE_FROM_INCOMING_INVITATIONS':
      return {
        ...state,
        incoming: state.incoming.filter((inv) => inv._id !== action.payload),
      };
    case 'REMOVE_FROM_FRIENDS_LIST':
      return { ...state, friends: state.friends.filter((friend) => friend._id !== action.payload) };
    default:
      return state;
  }
};

export const FriendsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(friendsReducer, {
    friends: [],
    incoming: [],
  });

  return <FriendsContext.Provider value={{ ...state, dispatch }}>{children}</FriendsContext.Provider>;
};
