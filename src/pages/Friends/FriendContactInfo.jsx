import CustomAvatar from '../../components/CustomAvatar';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
function FriendContactInfo({ friend }) {
  return (
    <div className='w-full py-16 flex flex-col items-center space-y-5'>
      <div className='w-1/2 space-y-5'>
        <div className='flex flex-col items-center '>
          <CustomAvatar user={friend} size='5' />
          <span className='text-2xl'>{friend?.displayName}</span>
          <span className='text-base text-neutral-600'>{friend?.username}</span>
        </div>
        <div className='space-y-3 flex flex-col items-center'>
          <div className='w-full  flex justify-center text-2xl'>Contact</div>
          <div className='space-y-1'>
            <div className='flex space-x-2 '>
              <PhoneIcon sx={{ color: '#16a34a' }} />
              <p className='font-[500]'>+{friend?.phoneNumber}</p>
            </div>

            <div className='flex space-x-2 '>
              <AlternateEmailIcon sx={{ color: '#0284c7' }} />
              <p className='font-[500]'>{friend?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FriendContactInfo;
