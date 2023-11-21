import { useState, useEffect } from 'react';
import { useFetchData } from '../hooks/useFetchData';

function UserInfoCardMinimal({ user }) {
  const { fetchData, isLoading } = useFetchData();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (user) {
      const fetch = async () => {
        const res = await fetchData(process.env.REACT_APP_API_USERS_DETAILS, user);
        setUserData(res?.user);
      };
      fetch();
    }
  }, [user]);
  return (
    <div className='bg-white rounded-lg h-auto flex flex-col pr-10 pl-3 py-3 space-y-4'>
      <div className='leading-none'>
        <p className='text-xs text-neutral-600'>E-mail address</p>
        {userData?.email && <p>{userData?.email}</p>}
        {!userData?.email && !isLoading && <p>N/A</p>}
      </div>
      <div className='leading-none'>
        <p className='text-xs text-neutral-600'>Phone number</p>
        {userData?.phoneNumber && <p>+{userData?.phoneNumber}</p>}
        {!userData?.phoneNumber && !isLoading && <p>N/A</p>}
      </div>
    </div>
  );
}
export default UserInfoCardMinimal;
