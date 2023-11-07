import { useAuthContext } from '../../../hooks/useAuthContext';
import { useFetchData } from '../../../hooks/useFetchData';
import { useEffect, useState } from 'react';
import SearchUserCard from '../SearchUserCard';

function PendingFriendsRequestList({ pendingRequestsArray }) {
  const [detailsArray, setDetailsArray] = useState([]);
  const { fetchData } = useFetchData();

  useEffect(() => {
    const fetchDataForAllRequests = async () => {
      if (pendingRequestsArray?.length > 0) {
        const results = await Promise.all(
          pendingRequestsArray.map(async (userDetails) => {
            const userData = await fetchData(process.env.REACT_APP_API_USERS_DETAILS, userDetails);
            return userData.user;
          }),
        );
        setDetailsArray(results);
      }
    };

    fetchDataForAllRequests();
  }, [pendingRequestsArray]);
  return (
    <>
      {detailsArray?.map((detail, key) => (
        <div className='pb-4' key={key}>
          <SearchUserCard key={key} user={detail} />
        </div>
      ))}
    </>
  );
}
export default PendingFriendsRequestList;
