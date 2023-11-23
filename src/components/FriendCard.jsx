import CustomAvatar from './CustomAvatar';
import { Dialog } from '@mui/material';
import { useState } from 'react';
import FriendContactInfo from '../pages/Friends/FriendContactInfo';
import ClearIcon from '@mui/icons-material/Clear';
import { useDeleteData } from './../hooks/useDeleteData';
import { useFriendsContext } from './../hooks/useFriendsContext';

function FriendCard({ friend }) {
  const { deleteData, data } = useDeleteData();
  const { dispatch } = useFriendsContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleRemoveFriend = async (id) => {
    await deleteData(process.env.REACT_APP_API_USERS, id);
    dispatch({ type: 'REMOVE_FROM_FRIENDS_LIST', payload: id });
    setRemoveFriendDialogOpen(false);
  };

  const ContactDialog = () => {
    return (
      <Dialog
        open={dialogOpen}
        sx={{
          '& .MuiPaper-rounded': { width: '100%' },
        }}
      >
        <button className='absolute right-4 top-4'>
          <ClearIcon onClick={handleCloseDialog} />
        </button>
        <FriendContactInfo friend={friend} />
      </Dialog>
    );
  };

  const RemoveFriendDialog = () => {
    return (
      <Dialog
        open={removeFriendDialogOpen}
        sx={{
          '& .MuiPaper-rounded': { width: '100%' },
        }}
      >
        <div className='w-full relative py-6 px-5 flex flex-col items-center space-y-8'>
          <button onClick={() => setRemoveFriendDialogOpen(false)}>
            <ClearIcon className='absolute right-3 top-3 text-neutral-400' />
          </button>
          <p>
            Are you sure you want to remove <span className='font-bold'>{friend?.displayName}</span>
            <span className='font-thin text-neutral-700'> ({friend?.username})</span> from your friends list?
          </p>
          <div className='flex space-x-8'>
            <button
              className='px-6 py-1 text-lg rounded-full bg-red-700 text-neutral-50'
              onClick={() => handleRemoveFriend(friend?._id)}
            >
              Remove
            </button>
            <button
              className='text-neutral-500 font-thin border-b-[1px]'
              onClick={() => setRemoveFriendDialogOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    );
  };

  const ButtonContactDialog = () => {
    return (
      <button
        className='rounded-xl bg-neutral-100 border-[1px] px-3 md:px-5 font-bold text-sm md:text-base mr-7 xl:mr-0'
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Contact
      </button>
    );
  };

  const RemoveFriendButton = () => {
    return (
      <>
        {showRemoveButton && (
          <button
            className='absolute top-2 right-3'
            onClick={() => {
              setRemoveFriendDialogOpen(true);
            }}
          >
            <ClearIcon className='text-neutral-400' />
          </button>
        )}
      </>
    );
  };

  const FriendDisplayData = () => {
    return (
      <>
        <CustomAvatar user={friend} size={4.5} />
        <div className='flex flex-col items-start xl:items-center'>
          <span className='md:text-2xl text-center text-ellipsis'>{friend.displayName} </span>
          <span className='text-neutral-500 font-thin'>{friend.username}</span>
        </div>
      </>
    );
  };

  return (
    <div
      className='flex flex-row xl:flex-col items-center xl:justify-center xl:aspect-square xl:w-[20%] w-full border-2 rounded-lg m-1 xl:py-8 py-4 relative'
      onMouseEnter={() => {
        setShowRemoveButton(true);
      }}
      onClick={() => {
        setShowRemoveButton(true);
      }}
    >
      <RemoveFriendButton />
      <div className='leading-none flex flex-row xl:flex-col items-center xl:justify-center justify-between w-full px-6  xl:px-0 xl:space-y-4 '>
        <div className='flex xl:flex-col items-center space-x-3 xl:space-x-0 xl:space-y-2 b'>
          <FriendDisplayData />
        </div>
        <ButtonContactDialog />
      </div>
      <RemoveFriendDialog />
      <ContactDialog />
    </div>
  );
}
export default FriendCard;
