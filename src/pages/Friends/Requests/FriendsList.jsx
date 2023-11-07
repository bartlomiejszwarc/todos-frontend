import FriendCard from '../../../components/FriendCard';
import { useFetchData } from '../../../hooks/useFetchData';
import { useEffect, useState } from 'react';

import { useFriendsContext } from '../../../hooks/useFriendsContext';

function FriendsList({ friendsList }) {
  const { friends, dispatch } = useFriendsContext();
  const { fetchData, data, isLoading } = useFetchData();
  const [userDetailsArray, setUserDetailsArray] = useState([]);

  useEffect(() => {
    const fetchDataForAllRequests = async () => {
      if (friendsList?.length > 0) {
        const results = await Promise.all(
          friendsList.map(async (userDetails) => {
            const userData = await fetchData(process.env.REACT_APP_API_USERS_DETAILS, userDetails);
            return userData.user;
          }),
        );
        setUserDetailsArray(results);
        dispatch({ type: 'SET_FRIENDS', payload: results });
      }
    };

    fetchDataForAllRequests();
  }, [friendsList]);

  return (
    <div className='w-full flex flex-wrap '>
      {friends?.map((friend, key) => (
        <FriendCard friend={friend} key={key} />
      ))}
    </div>
  );
}
export default FriendsList;
