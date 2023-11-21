function UserInfoCardMinimal({ user }) {
  return (
    <div className='bg-white rounded-lg h-auto flex flex-col pr-10 pl-3 py-3 space-y-4'>
      <div className='leading-none'>
        <p className='text-xs text-neutral-600'>E-mail address</p>
        {user?.email && <p>{user?.email}</p>}
        {!user?.email && <p>N/A</p>}
      </div>
      <div className='leading-none'>
        <p className='text-xs text-neutral-600'>Phone number</p>
        {user?.phoneNumber && <p>+{user?.phoneNumber}</p>}
        {!user?.phoneNumber && <p>N/A</p>}
      </div>
    </div>
  );
}
export default UserInfoCardMinimal;
