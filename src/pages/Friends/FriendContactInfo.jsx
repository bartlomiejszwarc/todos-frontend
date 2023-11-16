import CustomAvatar from '../../components/CustomAvatar';
import UserInfoCardField from '../../components/UserInfoCardField';
function FriendContactInfo({ friend }) {
  return (
    <div className='w-full py-16 flex flex-col items-center space-y-5 px-4 bg-neutral-200'>
      <div className='h-auto bg-neutral-50 rounded-lg w-full lg:w-10/12 pb-6'>
        <div className={'relative w-full h-10'}>
          <div className='absolute flex top-0 translate-y-[-50%] justify-center w-full '>
            <CustomAvatar user={friend} size={5} />
          </div>
        </div>
        <div className='flex justify-around'>
          <div className='flex flex-col space-y-3 px-6'>
            <UserInfoCardField fieldTitle={'Name'} fieldText={friend?.displayName} />
            <UserInfoCardField fieldTitle={'Username'} fieldText={friend?.username} />
            <UserInfoCardField fieldTitle={'Phone number'} fieldText={friend?.phoneNumber} />
            <UserInfoCardField fieldTitle={'E-mail address'} fieldText={friend?.email} />
          </div>
          <div className='flex flex-col space-y-3 px-6'>
            <UserInfoCardField fieldTitle={'Country'} fieldText={friend?.country} />
            <UserInfoCardField fieldTitle={'City'} fieldText={friend?.city} />
            <UserInfoCardField fieldTitle={'Something'} fieldText={friend?.something} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default FriendContactInfo;
