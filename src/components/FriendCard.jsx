import CustomAvatar from './CustomAvatar';
import { Dialog } from '@mui/material';
import { useState } from 'react';
import FriendContactInfo from '../pages/Friends/FriendContactInfo';
import ClearIcon from '@mui/icons-material/Clear';

function FriendCard({ friend }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleCloseDialog = () => {
    setDialogOpen(false);
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

  const ButtonContactDialog = () => {
    return (
      <button
        className='rounded-xl bg-neutral-100 border-[1px] px-3 md:px-5 font-bold text-sm md:text-base'
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Contact
      </button>
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
    <div className='flex flex-row xl:flex-col items-center xl:justify-center xl:aspect-square xl:w-[20%] w-full border-2 rounded-lg m-1 xl:py-8 py-4'>
      <div className='leading-none flex flex-row xl:flex-col items-center xl:justify-center justify-between w-full px-6  xl:px-0 xl:space-y-4'>
        <div className='flex xl:flex-col items-center space-x-3 xl:space-x-0 xl:space-y-2'>
          <FriendDisplayData />
        </div>
        <ButtonContactDialog />
      </div>
      <ContactDialog />
    </div>
  );
}
export default FriendCard;
