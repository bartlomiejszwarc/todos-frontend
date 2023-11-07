import { Avatar } from '@mui/material';
function FriendCard({ friend }) {
  return (
    <>
      <div className='flex flex-col items-center justify-center aspect-square w-[30%] xl:w-[20%] border-2 rounded-lg leading-none m-1'>
        <Avatar></Avatar>
        <span className='text-xl'>{friend.displayName} </span>
        <span>{friend.username}</span>
      </div>
    </>
  );
}
export default FriendCard;
