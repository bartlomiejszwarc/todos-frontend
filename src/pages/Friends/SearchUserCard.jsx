import { Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { usePostData } from '../../hooks/usePostData';
import { useFetchData } from '../../hooks/useFetchData';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import { useFriendsContext } from '../../hooks/useFriendsContext';
import CustomAvatar from '../../components/CustomAvatar';

function SearchUserCard({ user }) {
  useEffect(() => {
    const fetch = async () => {
      await fetchData(process.env.REACT_APP_API_USERS + 'requests/', currentUser.id);
    };
    fetch();
  }, []);

  const { friends } = useFriendsContext();
  const { user: currentUser } = useAuthContext();
  const { postData, data, error } = usePostData();
  const { fetchData, data: currentUserFriendsRequests, error: currentUserFriendsRequestsError } = useFetchData();
  const [isInvited, setIsInvited] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    checkIfInvited();
    checkIfIsFriend();
  }, [currentUserFriendsRequests]);

  const handleFriendsRequest = () => {
    const body = {
      invitedUserId: user?._id,
      sendByUserId: currentUser?.id,
    };
    postData(process.env.REACT_APP_API_USERS + 'invite', body);
    setIsInvited(!isInvited);
  };

  const checkIfInvited = () => {
    if (currentUserFriendsRequests?.requests?.pendingRequests?.includes(user._id)) {
      setIsInvited(true);
    } else {
      setIsInvited(false);
    }
  };

  const checkIfIsFriend = () => {
    if (friends.includes(friends.find((obj) => obj._id === user._id))) setIsFriend(true);
    else return setIsFriend(false);
  };

  if (currentUserFriendsRequestsError) return null;

  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-row space-x-4 items-center'>
        <CustomAvatar user={user} />
        <div className='w-full flex flex-col'>
          <span className='text-xl'>{user?.displayName}</span>
          <span className='text-sm'>{user?.username}</span>
        </div>
      </div>
      {!isFriend && (
        <Checkbox
          checked={isInvited}
          onClick={() => handleFriendsRequest()}
          icon={<AddIcon sx={{ color: '#e879f9' }} />}
          checkedIcon={<ClearIcon sx={{ color: '#9d174d' }} />}
        />
      )}
    </div>
  );
}
export default SearchUserCard;
