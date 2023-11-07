import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { usePostData } from '../hooks/usePostData';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';
import { useFriendsContext } from '../hooks/useFriendsContext';
import CustomAvatar from './CustomAvatar';

function FriendsInvitationCard({ item }) {
  const { dispatch } = useFriendsContext();
  const [isAccepted, setIsAccepted] = useState(null);
  const [isDeclined, setIsDeclined] = useState(null);
  const { postData } = usePostData();
  const { user } = useAuthContext();

  const acceptFriendsRequests = async () => {
    const body = { id: user.id, acceptedUserId: item._id };
    await postData(process.env.REACT_APP_API_USERS_REQUESTS_ACCEPT, body);
    setIsAccepted(true);
    setTimeout(() => {
      setIsAccepted(null);
      setIsDeclined(null);
      dispatch({ type: 'ADD_TO_FRIENDS_LIST', payload: item });
      dispatch({ type: 'REMOVE_FROM_INCOMING_INVITATIONS', payload: item._id });
    }, 1000);
  };

  const declineFriendsRequests = async () => {
    const body = { id: user.id, declinedUserId: item._id };
    await postData(process.env.REACT_APP_API_USERS_REQUESTS_DECLINE, body);
    setIsDeclined(true);
    setTimeout(() => {
      setIsAccepted(null);
      setIsDeclined(null);
      dispatch({ type: 'REMOVE_FROM_INCOMING_INVITATIONS', payload: item._id });
    }, 1000);
  };

  if (!item) {
    return null;
  }

  return (
    <div className='flex flex-row justify-between items-center'>
      <div className='flex items-center space-x-4'>
        <div>
          <CustomAvatar user={item} />
        </div>
        <div className='flex flex-col'>
          <span className='text-xl'>{item?.displayName}</span>
          <span className='text-sm'>{item?.username}</span>
        </div>
      </div>
      <div className='space-x-4 flex items-center'>
        {!isAccepted && !isDeclined && (
          <div className=' h-8 w-8 flex items-center justify-center rounded-full hover:bg-green-100 cursor-pointer'>
            <span
              className='text-green-600'
              onClick={() => {
                acceptFriendsRequests();
              }}
            >
              <DoneIcon />
            </span>
          </div>
        )}
        {isAccepted && !isDeclined && <span className='text-green-600 font-bold'>Accepted</span>}

        {!isDeclined && !isAccepted && (
          <div className=' h-8 w-8 flex items-center justify-center rounded-full hover:bg-red-100 cursor-pointer'>
            <span
              className='text-red-700'
              onClick={() => {
                declineFriendsRequests();
              }}
            >
              <ClearIcon />
            </span>
          </div>
        )}
        {isDeclined && !isAccepted && <span className='text-red-700 font-bold'>Declined</span>}
      </div>
    </div>
  );
}
export default FriendsInvitationCard;
